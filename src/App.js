// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ActivityForecast from "./components/ActivityForecast";
import Home from "./components/Home";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity-forecast" element={<ActivityForecast />} />
          {/* Add more routes for other pages */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
