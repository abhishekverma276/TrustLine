import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // Make sure this CSS file is appropriately styled for the dashboard

const DistributorDashboard = () => {
    const backgroundStyle = {
        background: 'linear-gradient(135deg, #295E7E, #7AADB4)',  // Updated to a more corporate color scheme
        minHeight: '107vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
    };

    const navigationButtons = [
        { name: 'Inventory Management', link: '/inventory' },
        { name: 'Order Fulfillment', link: '/orders' },
        { name: 'Logistics', link: '/logistics' },
    ];

    const buttonStyle = {
        padding: '10px 25px',
        margin: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '5px',
        border: 'none',
        color: '#fff',
        background: '#2A9D8F',  // teal shade
        textDecoration: 'none',
        transition: 'all 0.3s ease-in-out',
    };

    return (
        <div style={backgroundStyle}>
            <h1 style={{ color: '#fff', fontSize: '34px', marginBottom: '20px' }}>Welcome to TrustLine Distributor Dashboard!</h1>
            <div className="button-container">
                {navigationButtons.map((button, index) => (
                    <Link key={index} to={button.link} className="btn" style={buttonStyle}>
                        {button.name}
                    </Link>
                ))}
            </div>
            <Link to='/login' className="btn" style={{ color: 'white', textDecoration: 'none', backgroundColor: 'red', padding: '10px 20px', marginTop: '20px' }}>Logout</Link>
            <p style={{ color: 'white', marginTop: '20px' }}>©️2024 TrustLine</p>
        </div>
    );
};

export default DistributorDashboard;
