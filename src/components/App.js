import "./App.css";

import React, { useEffect, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../hoc/Auth";

import { Layout } from "antd";

import NavBar from "./views/NavBar/NavBar";

import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";

import UserPage from "./views/UserPage/UserPage";
import Product from "./Product";

const { Content, Footer } = Layout;

const NotFound = React.lazy(() => import("./views/NotFound/NotFound"));

function App() {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <NavBar />
      <Content style={{ padding: "0rem 0.5rem" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={Auth(LandingPage, null)} />
            <Route path="/login" element={Auth(LoginPage, false)} />
            <Route path="/register" element={Auth(RegisterPage, false)} />
            <Route path="/user" element={Auth(UserPage, null)} />
            <Route path="/product" element={Auth(Product, null)} />
            <Route path="/*" element={Auth(NotFound, null)} />
          </Routes>
        </Suspense>
      </Content>
      <Footer style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "1rem", marginTop: "0rem", padding: "0.5rem", backgroundColor: "#ddd" }}>It is ©2018 Created by BT Inc</Footer>
    </Layout>
  );
}

export default App;
