import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaEdit, FaBox, FaClipboardList } from 'react-icons/fa'; // Updated icons
import './Home.css';

const SupplierDashboard = () => {
    const backgroundStyle = {
        background: 'linear-gradient(135deg, #3E5151, #DECBA4)',
        minHeight: '107vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
    };

    const navigationButtons = [
        { name: 'Manage Products', link: '/add-product', icon: <FaPlusCircle /> },
        { name: 'View Orders', link: '/Orders', icon: <FaBox /> },
        { name: 'View Inventory', link: '/inventory', icon: <FaClipboardList /> },
    ];

    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 25px',
        margin: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '5px',
        border: 'none',
        color: '#fff',
        background: '#20C997',  // A refreshing green shade suitable for a supplier dashboard
        textDecoration: 'none',
        transition: 'all 0.3s ease-in-out',
    };

    const iconStyle = {
        marginRight: '8px',  // Style for spacing between icon and text
        fontSize: '20px',  // Icon size
    };

    return (
        <div style={backgroundStyle}>
            <h1 style={{ color: '#fff', fontSize: '34px', marginBottom: '20px' }}>Welcome to TrustLine Supplier Dashboard!</h1>
            <div className="button-container">
                {navigationButtons.map((button, index) => (
                    <Link key={index} to={button.link} className="btn" style={buttonStyle}>
                        <span style={iconStyle}>{button.icon}</span>
                        {button.name}
                    </Link>
                ))}
            </div>
            <Link to='/login' className="btn" style={{ color: 'white', textDecoration: 'none', backgroundColor: 'red', padding: '10px 20px', marginTop: '20px' }}>Logout</Link>
            <p style={{ color: 'white', marginTop: '20px' }}>©️2024 TrustLine</p>
        </div>
    );
};

export default SupplierDashboard;
