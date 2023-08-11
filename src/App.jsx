import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import AuthLayout from "./common/AuthLayout";
import Dashboard from "./pages/app/dashboard/Dashboard";

import Onboarding from "./pages/app/onboarding/Onboarding";
import Mapping from "./pages/app/Mapping/Mapping";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AuthLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/mapping" element={<Mapping />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
