const cors = require('cors');
const crypto = require('crypto');
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const OrderModel = require('./models/Order.js'); 
const ProductModel = require('./models/ProductModel');
const ReportModel = require('./models/ReportModel');
const { encrypt, decrypt } = require('./encryption');

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/practice_mern', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts from this IP, please try again later.',
  skipFailedRequests: true,
});

// Login functionality with rate limiting
app.post('/login', loginLimiter, async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await FormDataModel.findOne({ email, role });
    if (user) {
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
      if (hashedPassword === user.password) {
        res.json('Success');
      } else {
        res.status(401).json('Invalid credentials');
      }
    } else {
      res.status(401).json('Invalid credentials');
    }
  } catch (err) {
    res.status(500).json('An error occurred');
  }
});

// POST a new report
app.post('/api/reports', async (req, res) => {
  try {
    const report = new ReportModel(req.body);
    const savedReport = await report.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: 'Error saving report', error });
  }
});

// GET all reports
app.get('/api/reports', async (req, res) => {
  try {
    const reports = await ReportModel.find({});
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error });
  }
});

// Add a new product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new ProductModel({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error });
  }
});

// PUT update product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send('No product with that id');
  }

  try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
          id,
          { name, price, description },
          { new: true }
      );

      if (!updatedProduct) {
          return res.status(404).send('No product found with that id');
      }

      res.json(updatedProduct);
  } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
  }
});

// DELETE a product
app.delete('/api/products/:id', async (req, res) => {
  try {
      const result = await ProductModel.findByIdAndDelete(req.params.id);
      if (result) {
          res.status(200).json({ message: "Product successfully deleted" });
      } else {
          res.status(404).json({ message: "Product not found" });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
  }
});

// GET all products
app.get('/api/products', async (req, res) => {
  try {
      const products = await ProductModel.find({});
      res.json(products);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: error });
  }
});

// POST a new order
app.post('/api/orders', async (req, res) => {
  const { product, quantity, status } = req.body;

  // Optional: Validate the product ID and existence before creating an order
  if (!mongoose.Types.ObjectId.isValid(product)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const productExists = await ProductModel.findById(product);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newOrder = new OrderModel({
      product,
      quantity,
      status
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

// PUT update an existing order
app.put('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { product, quantity, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'No order with that ID' });
  }

  // Optional: Check if the new product ID is valid and exists
  if (product && !mongoose.Types.ObjectId.isValid(product)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const productExists = product ? await ProductModel.findById(product) : true;
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { product, quantity, status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'No order found with that ID' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
});


// PUT update an inventory item
app.put('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'No inventory item with that id' });
  }

  try {
    const updatedInventory = await InventoryModel.findByIdAndUpdate(
      id,
      { name, quantity },
      { new: true } // Return the updated document
    );

    if (!updatedInventory) {
      return res.status(404).json({ message: 'No inventory found with that id' });
    }

    res.json(updatedInventory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error });
  }
});

// DELETE an inventory item
app.delete('/api/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'No inventory item with that id' });
    }

    const result = await InventoryModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'No inventory found with that id' });
    }

    res.json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inventory', error });
  }
});

// User Management Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Order handling routes
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await OrderModel.find({}).populate('product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order' });
  }
});

// Inventory Routes
const InventoryModel = require('./models/InventoryModel');

app.get('/api/inventory', async (req, res) => {
  try {
    const inventory = await InventoryModel.find({});
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory' });
  }
});

app.post('/api/inventory', async (req, res) => {
  try {
    const newInventory = new InventoryModel(req.body);
    const savedInventory = await newInventory.save();
    res.json(savedInventory);
  } catch (error) {
    res.status(500).json({ message: 'Error saving inventory' });
  }
});

// Shipment Routes
const ShipmentModel = require('./models/ShipmentModel');

app.get('/api/shipments', async (req, res) => {
  try {
    const shipments = await ShipmentModel.find({}).populate('orderRef');
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shipments' });
  }
});

app.post('/api/shipments', async (req, res) => {
  try {
    const newShipment = new ShipmentModel(req.body);
    const savedShipment = await newShipment.save();
    res.json(savedShipment);
  } catch (error) {
    res.status(500).json({ message: 'Error saving shipment' });
  }
});

// Server listen on a single port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});