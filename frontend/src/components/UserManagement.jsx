import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserManagement.css';  // Ensure CSS is imported

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/users'); // Adjust the URL as necessary
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error.message);
            setError("Failed to fetch users. Please try again."); // Ensure setError is defined
        }
    };
    
    

    const handleDelete = async (userId) => {
        const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
        if (response.ok) {
            alert('User deleted successfully');
            fetchUsers();
        } else {
            alert('Failed to delete user');
        }
    };

    return (
        <div className="user-management-container">
            <h1>User Management</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Link to={`/edit-user/${user.id}`} className="btn">Edit</Link>
                                    <button onClick={() => handleDelete(user.id)} className="btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to="/AdminDash" className="link-back">Back to Dashboard</Link>
        </div>
    );
};

export default UserManagement;
