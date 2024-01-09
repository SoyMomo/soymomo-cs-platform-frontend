import { Route, Routes } from "react-router-dom";
// import PrivateRoute from "./components/PrivateRoute";
import React from 'react';
import Login from './pages/Login'
import Index from './pages/Index'
import WearerDashboard from "./pages/WearerDashboard";
import TabletDashboard from "./pages/TabletDashboard";
import TabletSearch from "./pages/TabletSearch";
import SimSearch from "./pages/SimSearch";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";
import './App.css';
import AuthProvider from "./authContext";
import SimDashboard from "./pages/SimDashboard";
// import { useState } from "react";
// require('dotenv').config()



function App() {

  // const [tokens, setTokens] = useState(null)

  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Index/>}/>
          <Route path="/wearer" element={<WearerDashboard/>}/>
          <Route path="/sim/dashboard" element={<SimDashboard/>}/>
          <Route path="/sim" element={<SimSearch/>}/>
          <Route path="/tablet/dashboard" element={<TabletDashboard/>}/>
          <Route path="/tablet" element={<TabletSearch/>}/>
          <Route path="/change-password" element={<ChangePassword/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
