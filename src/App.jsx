import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Colaboradores from "./components/Colaboradores";
import Empresas from "./components/Empresas";
import Ubicaciones from "./components/Ubicaciones";

function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Colaboradores />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/ubicaciones" element={<Ubicaciones />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
