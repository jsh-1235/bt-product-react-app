import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useSearchKey } from "./hooks";

import { Menu, message } from "antd";
import Icon, { LogoutOutlined } from "@ant-design/icons";

import { logoutUser } from "../../../../actions/user";

function MainMenu(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  // console.log("MainMenu", user);

  const handleLogout = () => {
    dispatch(logoutUser())
      .then((response) => {
        if (response.payload.success) {
          navigate("/login");
        } else {
          message.warning(response.payload.err);
        }
      })
      .catch((err) => console.log(err));
  };

  const [key, setKey] = useSearchKey(props);

  const onSelectHandler = (item, key, keyPath) => {
    // console.log(item, key, keyPath);
    setKey(key);
  };

  return (
    <Menu theme={props.theme} mode={props.mode} selectedKeys={key}>
      <Menu.Item key="" onClick={onSelectHandler}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="user" onClick={onSelectHandler}>
        <Link to="/user">User</Link>
      </Menu.Item>
      <Menu.Item key="product" onClick={onSelectHandler}>
        <Link to="/product">Product</Link>
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
      ) : props.mode === "horizontal" ? (
        <Menu.Item key="logout" style={{ flexGrow: "1", marginRight: "1rem" }}>
          <div style={{ textAlign: "end" }}>
            <Icon component={LogoutOutlined} />
            <span onClick={handleLogout}>Logout</span>
            <span style={{ marginLeft: "0.5rem", color: "#1890ff", fontStyle: "italic" }}>{user.userData.email}</span>
          </div>
        </Menu.Item>
      ) : (
        <Menu.Item key="logout">
          <div>
            <Icon component={LogoutOutlined} />
            <span onClick={handleLogout}>Logout</span>
            <span style={{ marginLeft: "0.5rem", color: "#1890ff", fontStyle: "italic" }}>{user.userData.email}</span>
          </div>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default MainMenu;
