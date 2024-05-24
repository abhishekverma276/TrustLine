import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const userRole = localStorage.getItem('userRole'); // Assuming the role is stored in localStorage

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            setError("Failed to fetch orders. Please try again.");
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:3001/api/orders/${orderId}`, { status: newStatus });
            setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
        } catch (error) {
            console.error("Failed to update order:", error);
            setError("Failed to update order. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Orders </h1>
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.tableContainer}>
                {orders.length ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Date</th>
                                {userRole !== 'Supplier' && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.item}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.status}</td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    {userRole === 'Retailer' && (
                                        <td>
                                            <button onClick={() => handleStatusChange(order._id, 'Canceled')}>Cancel</button>
                                        </td>
                                    )}
                                    {userRole === 'Supplier' && (
                                        <td>
                                            <button onClick={() => handleStatusChange(order._id, 'Pending')}>Mark as Pending</button>
                                            <button onClick={() => handleStatusChange(order._id, 'Done')}>Mark as Done</button>
                                        </td>
                                    )}
                                    {userRole === 'Distributor' && (
                                        <td>
                                            <button onClick={() => handleStatusChange(order._id, 'Fulfilled')}>Fulfill</button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        background: 'linear-gradient(to right, #3a7bd5, #3a6073)',
        minHeight: '107vh',
        color: '#fff',
        padding: '80px'
    },
    header: {
        textAlign: 'center',
        margin: '20px 0',
        fontSize: '35px'
    },
    tableContainer: {
        overflowX: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        fontSize: '16px'
    },
    error: {
        color: '#ff3860',
        textAlign: 'center'
    }
};

export default Orders;
