import "./App.css";

import React, { useEffect, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../hoc/Auth";

import { Layout } from "antd";

import NavBar from "./views/NavBar/NavBar";

// import Main from "./components/Main";
// import User from "./components/User";

import User from "./User";
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
            <Route path="/" element={Auth(User, null)} />
            <Route path="/product" element={Auth(Product, true)} />
            <Route path="/*" element={Auth(NotFound, null)} />

            {/* <Route path="/" element={Auth(LandingPage, null)} />
            <Route path="/login" element={Auth(LoginPage, false)} />
            <Route path="/register" element={Auth(RegisterPage, false)} />
            <Route path="/product/upload" element={Auth(UploadProductPage, true, true)} />
            <Route path="/product/:id" element={Auth(DetailProductPage, null)} />
            <Route path="/user/cart" element={Auth(CartPage, true)} />
            <Route path="/history" element={Auth(HistoryPage, true)} />
            <Route path="/*" element={Auth(NotFound, null)} /> */}
          </Routes>
        </Suspense>
      </Content>
      <Footer style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "1rem", marginTop: "0rem", padding: "0.5rem", backgroundColor: "#ddd" }}>It is ©2018 Created by BT Inc</Footer>
    </Layout>
  );
}

export default App;
