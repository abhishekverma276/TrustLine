import React from 'react';

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        padding: '10px',
        textAlign: 'center',
        position: 'fixed',
        width: '100%',
        bottom: '0',
        zIndex: '999',
    };

    const contactStyle = {
        marginTop: '10px',
        fontSize: '14px',
    };

    return (
        <div style={footerStyle}>
            <div style={contactStyle}>
                Contact & Support: <a href="mailto:abhishek27.sv@gmail.com" style={{ color: '#3498db' }}>getHelp@trustline.com</a>, ©️TrustLine
            </div>
        </div>
    );
};

export default Footer;
