// App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/about">Go to About</Link>
    </div>
  );
};

const About = () => {
  return <h1>About Page</h1>;
};

const ReactRouter = () => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
    // </BrowserRouter>
  );
};

export default ReactRouter;
