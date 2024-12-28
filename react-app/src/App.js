import { Route, Routes, Navigate  } from "react-router-dom";
import LoginPage from "./Pages/login";
import './App.css';
import UnauthorizedPage from "./Pages/unauthorizedPage/UnauthorizedPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import Products from "./Pages/products/products";
import Dashboard from "./Pages/dashboard";


function App() {

  return (
    <div>
       <Routes>
        {/* Private routes */}
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="products" element={<Products />} />
          </Route>
        </Route>

        {/* login routes */}
        <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/login" element={<LoginPage />} /> 

        {/*unauthorized route  */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} /> 
      </Routes>
    </div>
  );
}

export default App;