import React, { useState } from "react";

import { Button, Menu } from "antd";
import { Link } from "react-router-dom";
import "./mainheader.css";

const items = [
  {
    label: <Link to="/dashboard">Dashboard</Link>,
    key: "dashboard",
  },
  {
    label: <Link to="/onboarding">User OnBoarding</Link>,
    key: "aboutus",
  },
  {
    label: <Link to="/mapping">User Mapping</Link>,
    key: "contact",
  },
];

function MainHeader() {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div className="container">
      <Menu
        className="menu-container"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Link to="/">
        <Button type="primary" className="logoutbtn">
          Logot
        </Button>
      </Link>
    </div>
  );
}

export default MainHeader;
