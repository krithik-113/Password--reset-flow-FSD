import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterNewAC from "./components/Register.NewAC";
import ResetPassword from "./components/ResetPassword";
import { useState } from "react";

function App() {

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterNewAC />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
