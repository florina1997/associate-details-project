import React from "react";
import MainHeader from "./MainHeader";
import Layout from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import "./authlayout.css";

function AuthLayout() {
  return (
    <div>
      <MainHeader />
      <Layout className="auth-container">
        <Outlet />
      </Layout>
    </div>
  );
}

export default AuthLayout;
