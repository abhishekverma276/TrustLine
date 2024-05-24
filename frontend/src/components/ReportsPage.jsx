import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const ReportsPage = () => {
    const role = localStorage.getItem('role');
    const [reports, setReports] = useState([]);
    const [reportData, setReportData] = useState({
        supply: '',
        delivery: '',
        sales: '',
        feedback: '',
        logistics: '',
        production: '',
        challenges: ''
    });

    // Fetch reports if the user is an admin
    useEffect(() => {
        if (role === 'admin') {
            fetchReports();
        }
    }, [role]);

    const fetchReports = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/reports', {...reportData, role});
            setReports(response.data);
        } catch (error) {
            console.error("Failed to fetch reports:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReportData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (role !== 'admin') {
            try {
                const response = await axios.post('/api/reports', {...reportData, role});
                setReports([...reports, response.data]);
                setReportData({
                    supply: '',
                    delivery: '',
                    sales: '',
                    feedback: '',
                    logistics: '',
                    production: '',
                    challenges: ''
                });
            } catch (error) {
                console.error("Failed to submit report:", error);
            }
        }
    };

    const dashboardLink = () => {
        switch (role) {
            case 'supplier': return '/SuppDash';
            case 'retailer': return '/RetailDash';
            case 'producer': return '/ProducerDash';
            case 'distributor': return '/DistributorDash';
            case 'admin': default: return '/AdminDash';
        }
    };

    return (
        <div style={backgroundStyle}>
            <h1 style={headerStyle}>Reports </h1>
            {role === 'admin' ? (
                <div>
                    <h2>View Reports</h2>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Role</th>
                                <th>Supply</th>
                                <th>Delivery</th>
                                <th>Sales</th>
                                <th>Feedback</th>
                                <th>Logistics</th>
                                <th>Production</th>
                                <th>Challenges</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (
                                <tr key={index}>
                                    <td>{new Date(report.date).toLocaleDateString()}</td>
                                    <td>{report.role}</td>
                                    <td>{report.supply || '-'}</td>
                                    <td>{report.delivery || '-'}</td>
                                    <td>{report.sales || '-'}</td>
                                    <td>{report.feedback || '-'}</td>
                                    <td>{report.logistics || '-'}</td>
                                    <td>{report.production || '-'}</td>
                                    <td>{report.challenges || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={formStyle}>
                    {Object.entries(reportData).filter(([key]) => key !== 'role').map(([key, value]) => (
                        <input
                            key={key}
                            type="text"
                            name={key}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={value}
                            onChange={handleInputChange}
                            style={inputStyle}
                        />
                    ))}
                    <button type="submit" style={buttonStyle}>Submit Report</button>
                </form>
            )}
        </div>
    );
};

const backgroundStyle = {
    background: 'linear-gradient(135deg, #0A0F0D, #22333B)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
};

const headerStyle = {
    color: '#fff',
    fontSize: '34px',
    marginBottom: '20px',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

const inputStyle = {
    padding: '10px',
    marginBottom: '10px',
    width: '300px'
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    background: '#335C67',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    backgroundColor: 'red',
    padding: '10px 20px',
    marginTop: '20px',
};

const tableStyle = {
    width: '100%',
    marginTop: '20px',
    color: '#fff',
    background: '#335C67',
    borderRadius: '5px',
    padding: '10px'
};

export default ReportsPage;
