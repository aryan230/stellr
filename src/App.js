import "./css/main.css";
import Editor from "./Pages/Editor";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Project from "./Pages/Project";
import { useState } from "react";
import ProjectComp from "./Components/Project/ProjectComp";
import ProfilePage from "./Pages/ProfilePage";
import AccountSetup from "./Pages/AccountSetup";
import OrganizationSetup from "./Pages/OrganizationSetup";
import Footer from "./Pages/Footer";
import Banner from "./Components/Banner";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Editor />} />
          <Route path="/admin/users" element={<Editor />} />
          <Route path="/account/setup" element={<AccountSetup />} />
          <Route path="/organization/setup" element={<OrganizationSetup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/projects" element={<Register />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
