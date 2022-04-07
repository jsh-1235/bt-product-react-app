import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Navbar.module.css";
import classNames from "classnames/bind";

import MainMenu from "./Sections/MainMenu";

import { Drawer, Button } from "antd";

import Icon, { MoreOutlined, HomeFilled } from "@ant-design/icons";
import { Row, Col, Layout } from "antd";

const { Header } = Layout;

function NavBar() {
  let page = useSelector((state) => state.page);

  const [visible, setVisible] = useState(false);
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);

  useEffect(() => {
    window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSelectMenu = (item, key, keyPath) => {
    // console.log(item, key, keyPath);

    setVisible(false);
  };

  const menu = <MainMenu theme="light" mode={matches ? "horizontal" : "inline"} page={page} handleSelectMenu={handleSelectMenu} />;

  return (
    <Header className={`${styles.root}`}>
      <Row justify="start " align="middle">
        <Col flex={matches ? 0 : 1}>
          <div className={classNames(styles.logo)}>
            <Link to="/">
              <Icon component={HomeFilled} style={{ fontSize: "16px", marginLeft: "1rem" }} />
            </Link>
          </div>
        </Col>
        {matches ? (
          <Col flex={1}>{menu}</Col>
        ) : (
          <Col>
            <div className={classNames(styles.menuMoreButton)}>
              <Button type="primary" style={{ marginRight: "1rem" }} onClick={showDrawer}>
                <Icon component={MoreOutlined} />
              </Button>
            </div>
            <Drawer title="Drawer" placement="right" bodyStyle={{ padding: "0rem" }} width="200" closable={true} onClose={onClose} visible={visible}>
              {menu}
            </Drawer>
          </Col>
        )}
      </Row>
    </Header>
  );
}

export default NavBar;
