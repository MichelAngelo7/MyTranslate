import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import AddWord from "./components/add/AddWord.jsx";
import EditWord from "./components/edit/EditWord.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<AddWord />} />
        <Route path="/edit/:id" element={<EditWord />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
