import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts().catch(err => setError('Failed to fetch products'));
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/products');
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Fetch error:', error.message);
            setError(error.message);
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`http://localhost:3001/api/products/${productId}`, {
                    method: 'DELETE',
                });
    
                if (!response.ok) throw new Error('Failed to delete the product');
    
                alert('Product deleted successfully!');
                setProducts(products.filter(product => product._id !== productId));
            } catch (error) {
                console.error('Error:', error.message);
                alert('Error: ' + error.message);
            }
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const productData = {
            name: productName,
            price: price,
            description: description
        };

        try {
            const response = await fetch('http://localhost:3001/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) throw new Error('Failed to add product');
            alert('Product added successfully!');
            setProductName('');
            setPrice('');
            setDescription('');
            await fetchProducts(); 
        } catch (error) {
            console.error('Error:', error.message);
            alert('Error: ' + error.message);
        }
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <div style={formContainerStyle}>
            <h1 style={headerStyle}>Add New Product</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    style={inputStyle}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={textareaStyle}
                />
                <button type="submit" style={buttonStyle}>Add Product</button>
            </form>
            <div style={{ marginTop: '20px', width: '100%', overflowX: 'auto' }}>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
    {products.map(product => (
        <tr key={product._id}>
            <td>{product.name}</td>
            <td>
                {typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
            </td>
            <td>{product.description || 'No description available'}</td>
            <td>
                <button onClick={() => handleDelete(product._id)} style={deleteButtonStyle}>
                    Delete
                </button>
            </td>
        </tr>
    ))}
</tbody>

                </table>
            </div>
        </div>
    );
};

// Styling constants
const deleteButtonStyle = {
    background: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    marginLeft: '10px'
};

const formContainerStyle = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '107vh',
    background: 'linear-gradient(135deg, #3E5151, #DECBA4)'
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    color: '#fff', // Assuming you want white text to match your theme
    backgroundColor: '#20C997', // A background color to match the button
    padding: '10px 0', // Add padding to the top and bottom of each cell
    textAlign: 'center', // Center align the text in each cell
    border: '2px solid #fff' // White border for each cell
};

const headerStyle = {
    color: '#fff',
    marginBottom: '20px'
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '300px'
};

const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd'
};

const textareaStyle = {
    height: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd'
};

const buttonStyle = {
    background: '#20C997',
    color: '#fff',
    padding: '10px 25px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};

export default AddProduct;
