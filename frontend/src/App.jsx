import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
