import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Login/Login';
import CredentialsPage from './Pages/Credentials/Credentials';
import './App.css';
import Popular from './Pages/Popular/Popular';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <h1>Welcome to the App</h1>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/credentials" element={<CredentialsPage />} />
                    <Route path="/popular" element={<Popular />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;