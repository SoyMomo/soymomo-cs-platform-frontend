import {Route, Routes} from "react-router-dom";
import Login from './pages/Login'
import Index from './pages/Index'
import WearerDashboard from "./pages/WearerDashboard";
import TabletDashboard from "./pages/TabletDashboard";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Index/>}/>
        <Route path="/wearer" element={<WearerDashboard/>}/>
        <Route path="/tablet" element={<TabletDashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
