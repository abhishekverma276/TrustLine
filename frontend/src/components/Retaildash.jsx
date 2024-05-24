import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed for HTTP requests
import './Retaildash.css'; // Ensure this CSS file is correctly linked and set up

const RetailerDashboard = () => {
    // State to manage data for various dashboard cards
    const [inventory, setInventory] = useState([]);
    const [orders, setOrders] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [notifications, setNotifications] = useState([]);

    // Simulated fetching data from a backend
    useEffect(() => {
        fetchInventory();
        fetchOrders();
        fetchSuppliers();
        fetchSalesData();
        fetchNotifications();
    }, []);

    const fetchInventory = async () => {
        const response = await axios.get('/api/inventory');
        setInventory(response.data); // Assume response.data contains inventory data
    };

    const fetchOrders = async () => {
        const response = await axios.get('/api/orders');
        setOrders(response.data); // Assume response.data contains order data
    };

    const fetchSuppliers = async () => {
        const response = await axios.get('/api/suppliers');
        setSuppliers(response.data); // Assume response.data contains supplier data
    };

    const fetchSalesData = async () => {
        const response = await axios.get('/api/sales');
        setSalesData(response.data); // Assume response.data contains sales analytics data
    };

    const fetchNotifications = async () => {
        const response = await axios.get('/api/notifications');
        setNotifications(response.data); // Assume response.data contains notifications
    };

    return (
        <div className="dashboard">
            <div className="header">
                <h1 className="dashboard-title">Welcome to TrustLine Retailer Dashboard !</h1>
                <Link to='/login' className="logout-button">Logout</Link>
            </div>
            <div className="dashboard-grid">
                <div className="card inventory-overview">
                    <h2>Inventory Overview</h2>
                    <p>Track current stock levels, view items needing restocking, and manage inventory alerts to optimize your stock efficiently.</p>
                    {/* Display inventory data here */}
                </div>
                <div className="card order-management">
                    <h2>Order Management</h2>
                    <p>Monitor order statuses from placement through to delivery. Manage customer orders, track shipments, and update order details as needed.</p>
                    {/* Display orders data here */}
                </div>
                <div className="card supplier-interactions">
                    <h2>Supplier Interactions</h2>
                    <p>Access supplier contact information, assess supplier performance metrics, and facilitate quick communication for faster resolution times.</p>
                    {/* Display suppliers data here */}
                </div>
                <div className="card sales-analytics">
                    <h2>Sales Analytics</h2>
                    <p>Visualize sales data through interactive charts and graphs to identify trends, forecast demand, and drive strategic decision-making.</p>
                    {/* Display sales analytics here */}
                </div>
                <div className="card notifications">
                    <h2>Notifications</h2>
                    <p>Receive real-time alerts on inventory levels, order updates, and other critical notifications to keep you informed and proactive.</p>
                    {/* Display notifications here */}
                </div>
            </div>
        </div>
    );
};

export default RetailerDashboard;
