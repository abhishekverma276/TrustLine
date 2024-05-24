import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const AdminDashboard = () => {
    const backgroundStyle = {
        background: 'linear-gradient(135deg, #0A0F0D, #22333B)',
        minHeight: '107vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
    };

    const navigationButtons = [
        { name: 'User Management', link: '/UserManagement' },
        { name: 'Reports', link: '/ReportsPage' },
    ];

    const buttonStyle = {
        padding: '10px 25px',
        margin: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '5px',
        border: 'none',
        color: '#fff',
        background: '#335C67', 
        textDecoration: 'none',
        transition: 'all 0.3s ease-in-out',
    };

    return (
        <div style={backgroundStyle}>
            <h1 style={{ color: '#fff', fontSize: '34px', marginBottom: '20px' }}>Welcome to TrustLine Admin Dashboard!</h1>
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

export default AdminDashboard;