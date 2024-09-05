// src/App.tsx

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import CountryNews from "./components/CountryNews";
import {
  FaHome,
  FaGlobe,
  FaBusinessTime,
  FaLaptop,
  FaFootballBall,
  FaFilm,
  FaAtom,
  FaHeartbeat,
} from "react-icons/fa";
import Home from "./pages/home";
import Search from "./pages/search";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home country="us" topic="all" icon={<FaHome />} />}
          />
          <Route
            path="/:country"
            element={<CountryNews icon={<FaGlobe />} />}
          />
          <Route
            path="/business"
            element={
              <News country="us" topic="business" icon={<FaBusinessTime />} />
            }
          />
          <Route
            path="/technology"
            element={
              <News country="us" topic="technology" icon={<FaLaptop />} />
            }
          />
          <Route
            path="/sports"
            element={
              <News country="us" topic="sports" icon={<FaFootballBall />} />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News country="us" topic="entertainment" icon={<FaFilm />} />
            }
          />
          <Route
            path="/science"
            element={<News country="us" topic="science" icon={<FaAtom />} />}
          />
          <Route
            path="/health"
            element={
              <News country="us" topic="health" icon={<FaHeartbeat />} />
            }
          />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
