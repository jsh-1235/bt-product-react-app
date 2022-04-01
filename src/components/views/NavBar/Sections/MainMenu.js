import React from "react";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useSearchKey } from "./hooks";

import axios from "axios";

import { Menu, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { USER_SERVER } from "../../../Config";

function MainMenu(props) {
  const [key, setKey] = useSearchKey(props);

  // console.log("props", props);

  const onSelectHandler = (item, key, keyPath) => {
    console.log(item, key, keyPath);
    setKey(key);
  };

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  // console.log(user.userData);

  const handleLogout = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        message.warning("Logout failed.");
      }
    });
  };

  return (
    <Menu theme={props.theme} mode={props.mode} selectedKeys={key}>
      <Menu.Item key="" onClick={onSelectHandler}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="product" onClick={onSelectHandler}>
        <Link to="/product">Product</Link>
      </Menu.Item>
      <Menu.Item key="cart" onClick={onSelectHandler}>
        <Link to="/user/cart">Cart</Link>
      </Menu.Item>
      <Menu.Item key="history" onClick={onSelectHandler}>
        <Link to="/history">History</Link>
      </Menu.Item>
      {!user.userData?.isAuth ? (
        <>
          <Menu.Item key="login" onClick={onSelectHandler}>
            <Link to="/login">Sign in</Link>
          </Menu.Item>
          <Menu.Item key="register" onClick={onSelectHandler}>
            <Link to="/register">Sign up</Link>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <span onClick={handleLogout}>Logout</span>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default MainMenu;
