import React, { useState, useEffect } from 'react';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const userRole = localStorage.getItem('role'); // Retrieve the role from localStorage

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleCreate = async () => {
        const itemName = prompt("Enter item name:");
        const itemQuantity = prompt("Enter quantity:");
        const itemLocation = prompt("Enter location:");
        const newItem = { item: itemName, quantity: parseInt(itemQuantity, 10), location: itemLocation };

        try {
            const response = await fetch('http://localhost:3001/api/inventory', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newItem)
            });
            if (!response.ok) throw new Error('Failed to create new item');
    
            const addedItem = await response.json();
            setItems([...items, addedItem]);
            alert('Item added successfully!');
        } catch (error) {
            console.error('Create error:', error.message);
            setError(error.message);
        }
    };
    
    const fetchInventory = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/inventory');
            if (!response.ok) throw new Error('Failed to fetch inventory');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Fetch error:', error.message);
            setError(error.message);
        }
    };

    const handleUpdate = async (id) => {
        const item = items.find(item => item._id === id);
        const newItem = {...item, item: prompt("Update item name:", item.item), quantity: parseInt(prompt("Update quantity:", item.quantity), 10), location: prompt("Update location:", item.location)};
        try {
            const response = await fetch(`http://localhost:3001/api/inventory/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newItem)
            });
            if (!response.ok) throw new Error('Failed to update the item');
            const result = await response.json();
            setItems(items.map(item => item._id === id ? result : item));
            alert('Item updated successfully!');
        } catch (error) {
            console.error('Update error:', error.message);
            setError(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                const response = await fetch(`http://localhost:3001/api/inventory/${id}`, {method: 'DELETE'});
                if (!response.ok) throw new Error('Failed to delete the item');
                setItems(items.filter(item => item._id !== id));
                alert('Item deleted successfully!');
            } catch (error) {
                console.error('Delete error:', error.message);
                setError(error.message);
            }
        }
    };

    return (
        <div style={backgroundStyle}>
            <h1>Inventory</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item._id}>
                            <td>{item.item}</td>
                            <td>{item.quantity}</td>
                            <td>{item.location}</td>
                            <td>
                                {userRole === 'Distributor' && (
                                    <>
                                        <button style={buttonStyle} onClick={() => handleUpdate(item._id)}>Update</button>
                                        <button style={buttonStyle} onClick={() => handleDelete(item._id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {userRole === 'Distributor' && <button style={addButtonStyle} onClick={handleCreate}>Add New Item</button>}
            {error && <p>{error}</p>}
        </div>
    );
};

const backgroundStyle = {
    background: 'linear-gradient(to right, #1a2980 0%, #26d0ce 100%)',
    minHeight: '107vh',
    color: '#fff',
    padding: '80px'
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
};

const buttonStyle = {
    margin: '5px',
    padding: '8px 16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#f44336',
    color: 'white'
};

const addButtonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    marginTop: '20px'
};

export default Inventory;
