import {BrowserRouter,Routes,Route} from "react-router-dom";

import './App.css';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div >
     <BrowserRouter>
      <Routes>

        {/* Home page by default */}
        <Route path="/" element={<HomePage />}/>

        {/* Register page Path */}
        <Route path="/register" element={<RegisterPage />}/>

        {/* Login page Path */}
        <Route path="/login" element={<LoginPage />}/>
        
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
