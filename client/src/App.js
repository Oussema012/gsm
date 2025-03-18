import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeviceList from './DeviceList';
import DeviceDetails from './DeviceDetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DeviceList />} />
                <Route path="/device/:id" element={<DeviceDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
