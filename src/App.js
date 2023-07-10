import { Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Index from './pages/Index'
import WearerDashboard from "./pages/WearerDashboard";
import TabletDashboard from "./pages/TabletDashboard";
import TabletSearch from "./pages/TabletSearch";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";
import './App.css';
import AuthContext from "./authContext";
import { useState } from "react";

function App() {

  const [tokens, setTokens] = useState(null)

  return (
    <AuthContext.Provider value={{tokens, setTokens}}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Index/>}/>
          <Route path="/wearer" element={<WearerDashboard/>}/>
          <Route path="/tablet/dashboard" element={<TabletDashboard/>}/>
          <Route path="/tablet" element={<TabletSearch/>}/>
          <Route path="/change-password" element={<ChangePassword/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
