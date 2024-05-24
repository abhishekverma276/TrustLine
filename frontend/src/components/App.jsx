import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDash from './AdminDash';
import Login from './Login';
import Register from './Register';
import Orders from './Orders';
import ProducerDasboard from './producerdash';
import RetailerDashboard from './Retaildash';
import SupplierDashboard from './SuppDash';
import DistributorDashboard from './DistributorDashboard';
import UserManagement from './UserManagement';
import AddProduct from './add-product';
import Inventory from './inventory';
import ReportsPage from './ReportsPage';

function App() {
  return (
    <div style={{ marginTop: '-3.5rem' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/AdminDash" element={<AdminDash />} />
          <Route path="/ReportsPage" element={<ReportsPage />} />
          <Route path="/DistributorDashboard" element={<DistributorDashboard />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/producerdash" element={<ProducerDasboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/Retaildash" element={<RetailerDashboard />} />
          <Route path="/SuppDash" element={<SupplierDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
