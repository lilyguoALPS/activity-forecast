import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ActivityForecast from "./components/ActivityForecast";
import Home from "./components/Home";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity-forecast" element={<ActivityForecast />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
