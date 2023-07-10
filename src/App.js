import { Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Index from './pages/Index'
import WearerDashboard from "./pages/WearerDashboard";
import TabletDashboard from "./pages/TabletDashboard";
import TabletSearch from "./pages/TabletSearch";
import NotFound from "./pages/NotFound";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Index/>}/>
        <Route path="/wearer" element={<WearerDashboard/>}/>
        <Route path="/tablet/dashboard" element={<TabletDashboard/>}/>
        <Route path="/tablet" element={<TabletSearch/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
