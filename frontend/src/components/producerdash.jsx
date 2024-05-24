import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // Make sure this CSS file contains appropriate styles for the dashboard

const ProducerDashboard = () => {
    const backgroundStyle = {
        background: 'linear-gradient(135deg, #334D50, #CBCAA5)',  // Updated colors to match a more industrial or agricultural theme
        minHeight: '107vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
    };

    const navigationButtons = [
        { name: 'Production Orders', link: '/production-orders' },
        { name: 'Supply Requests', link: '/supply-requests' },
        { name: 'Product Catalog', link: '/product-catalog' },
        { name: 'Report Entry', link: '/ReportsPage' },
    ];

    const buttonStyle = {
        padding: '10px 25px',
        margin: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '5px',
        border: 'none',
        color: '#fff',
        background: '#1E6F5C',  // A greenish shade to suit the agricultural/industrial context
        textDecoration: 'none',
        transition: 'all 0.3s ease-in-out',
    };

    return (
        <div style={backgroundStyle}>
            <h1 style={{ color: '#fff', fontSize: '34px', marginBottom: '20px' }}>Welcome to TrustLine Producer Dashboard!</h1>
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

export default ProducerDashboard;
