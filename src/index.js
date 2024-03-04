import './index.css';

import React from 'react';
import log from 'loglevel';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AuthProvider } from './contexts/AuthContext';


// Set logging for whole app
if(process.env.NODE_ENV==='production'){
  log.setLevel('warn')
}else{
  log.setLevel('debug')
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  // </React.StrictMode> 
);
