import React from "react";

import { Routes, Route } from "react-router-dom";
import { Auth, Control, Files, Home } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/control/" element={<Control />} />
      <Route path="/control/auth" element={<Auth />} />
      <Route path="/control/view/:id" element={<Files />} />
    </Routes>
  );
};

export default App;
