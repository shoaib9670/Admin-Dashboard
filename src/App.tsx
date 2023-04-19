import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MyForm from './Vendor/Vendor';
import Dashboard from './Home/Home';
import NavBar from './Nav/Nav';
import Stores from './Stores/Stores';
import Edit from './EditDetails/Edit';
const VendorPage = React.lazy(() => import('./VendorDesc/ViewVendor'));

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/form" element={<MyForm />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/vendor" element={<VendorPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

