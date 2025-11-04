import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./UserProfileAxiosWithRoute";
import SaveSuccess from "./SaveSuccessWithoutuseLocation";
import SaveError from "./SaveErrorWithoutUseLocation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="/success" element={<SaveSuccess />} />
        <Route path="/error" element={<SaveError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
