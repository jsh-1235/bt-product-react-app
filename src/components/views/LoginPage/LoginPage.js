import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";

import styles from "./LoginPage.module.css";
import classNames from "classnames/bind";

import { Form, Input, Button, Checkbox, Typography } from "antd";
import Icon, { SmileOutlined, LockOutlined } from "@ant-design/icons";

import { loginUser } from "../../../actions/user";

const { Title } = Typography;

export default function LoginPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : "";

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Email is invalid.").required("Email is required."),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required."),
      })}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };

          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.success) {
                window.localStorage.setItem("userId", response.payload.userId);

                if (rememberMe === true) {
                  window.localStorage.setItem("rememberMe", values.email);
                } else {
                  window.localStorage.removeItem("rememberMe");
                }

                navigate("/");
              } else {
                setFormErrorMessage(response.payload.err);
              }
            })
            .catch((err) => {
              setFormErrorMessage("Check out your Account or Password again");
              setTimeout(() => {
                setFormErrorMessage(err);
              }, 1000);
            });

          actions.setSubmitting(false);
        }, 500);
      }}>
      {(props) => {
        const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

        return (
          <div className={classNames(styles.root)}>
            <div style={{ textAlign: "center", marginBottom: "0rem" }}>
              <Title level={2}>Sign in</Title>
            </div>
            <Form style={{ width: "300px" }} onSubmit={handleSubmit}>
              <Form.Item required>
                <Input id="email" autoComplete="on" prefix={<Icon component={SmileOutlined} />} placeholder="Enter your email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={errors.email && touched.email ? classNames(styles.textInputError) : classNames(styles.textInput)} />
                {errors.email && touched.email && <div className={classNames(styles.inputFeedback)}>{errors.email}</div>}
              </Form.Item>

              <Form.Item required>
                <Input id="password" autoComplete="on" prefix={<Icon component={LockOutlined} style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Enter your password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.password && touched.password ? classNames(styles.textInputError) : classNames(styles.textInput)} />
                {errors.password && touched.password && <div className={classNames(styles.inputFeedback)}>{errors.password}</div>}
              </Form.Item>

              {formErrorMessage && (
                <label>
                  <p style={{ color: "#ff0000bf", fontSize: "0.7rem", border: "1px solid", padding: "1rem", borderRadius: "10px" }}>{formErrorMessage}</p>
                </label>
              )}

              <Form.Item>
                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}>
                  Remember me
                </Checkbox>
                <Link to="/reset_user" style={{ float: "right" }}>
                  Forgot password
                </Link>
                <div>
                  <Button type="primary" disabled={isSubmitting} style={{ minWidth: "100%" }} onClick={handleSubmit}>
                    Login
                  </Button>
                </div>
                Or <Link to="/register">register now!</Link>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
