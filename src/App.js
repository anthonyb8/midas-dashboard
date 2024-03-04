import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import { BacktestProvider } from './contexts/DataContext'; 
import LoginUser from './features/auth/components/LoginUser';
import Dashboard from './features/dashboard/components/Dashboard';
import FilterView from './features/filter/components/FilterView';

import AuthenticatedNavBar from './shared/AuthenticatedNavBar';
import UnauthenticatedNavBar from './shared/UnauthenticatedNavBar';
import ProtectedRoute from './shared/ProtectedRoute';
import LandingPage from './features/landing/LandingPage';

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <BacktestProvider> 
        { isAuthenticated ? <AuthenticatedNavBar /> : <UnauthenticatedNavBar /> }
        <Routes>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/filter" element={<ProtectedRoute><FilterView /></ProtectedRoute>}/>
          <Route path="/login" element={<LoginUser />}/>
          <Route path="" element={isAuthenticated ? <Navigate to="/filter" /> :<LandingPage/>}/>
        </Routes>
      </BacktestProvider>
    </Router>
  );
};

export default App;
