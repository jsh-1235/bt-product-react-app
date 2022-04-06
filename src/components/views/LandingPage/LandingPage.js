import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Col, Card, Row, Typography, Button, message } from "antd";
import Icon, { RocketOutlined } from "@ant-design/icons";

const { Title } = Typography;

function LandingPage() {
  useEffect(() => {}, []);

  return (
    <div style={{ width: "100%", margin: "1rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>
          Let's Travel Anywhere <Icon component={RocketOutlined} />
        </Title>
      </div>
    </div>
  );
}

export default LandingPage;
