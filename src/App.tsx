import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="h-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<ProtectedRoute component={Tasks} />} />
      </Routes>
    </div>
  );
}

export default App;
