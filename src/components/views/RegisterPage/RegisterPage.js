import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { registerUser } from "../../../actions/user";
import { useDispatch } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";

import { Form, Input, Button, Typography, Space, message } from "antd";

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function RegisterPage(props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "1rem",
    },
    inputFeedback: {
      color: "red",
      marginTop: "4px",
    },
    textInput: {
      color: "black",
    },
    textInputError: {
      color: "red",
    },
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required("First name is required."),
        lastName: Yup.string().required("Last name is required."),
        email: Yup.string().email("Email is invalid.").required("Email is required."),
        password: Yup.string().min(6, "Password must be at least 6 characters.").required("Password is required."),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match.")
          .required("Confirm password is required."),
      })}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          let dataToSubmit = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              navigate("/login");
            } else {
              message.error(response.payload.err, 1);
            }
          });

          actions.setSubmitting(false);
        }, 500);
      }}>
      {(props) => {
        const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;

        return (
          <div style={styles.root}>
            <div style={{ textAlign: "center", marginBottom: "0rem" }}>
              <Title level={2}>Sign up</Title>
            </div>
            <Form layout="horizontal" {...formItemLayout} onSubmit={handleSubmit}>
              <Form.Item required label="First Name">
                <Input id="firstName" autoComplete="off" placeholder="Enter your First name" type="text" value={values.firstName} onChange={handleChange} onBlur={handleBlur} className={errors.firstName && touched.firstName ? styles.textInputError : styles.textInput} />
                {errors.firstName && touched.firstName && <div style={styles.inputFeedback}>{errors.firstName}</div>}
              </Form.Item>

              <Form.Item required label="Last Name">
                <Input id="lastName" autoComplete="off" placeholder="Enter your Last name" type="text" value={values.lastName} onChange={handleChange} onBlur={handleBlur} className={errors.lastName && touched.lastName ? styles.textInputError : styles.textInput} />
                {errors.lastName && touched.lastName && <div style={styles.inputFeedback}>{errors.lastName}</div>}
              </Form.Item>

              <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : "success"}>
                <Input id="email" autoComplete="off" placeholder="Enter your Email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} style={errors.email && touched.email ? styles.textInputError : styles.textInput} />
                {errors.email && touched.email && <div style={styles.inputFeedback}>{errors.email}</div>}
              </Form.Item>

              <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : "success"}>
                <Input id="password" autoComplete="off" placeholder="Enter your password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.password && touched.password ? styles.textInputError : styles.textInput} />
                {errors.password && touched.password && <div style={styles.inputFeedback}>{errors.password}</div>}
              </Form.Item>

              <Form.Item required label="Confirm" hasFeedback>
                <Input id="confirmPassword" autoComplete="off" placeholder="Enter your confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} className={errors.confirmPassword && touched.confirmPassword ? styles.textInputError : styles.textInput} />
                {errors.confirmPassword && touched.confirmPassword && <div style={styles.inputFeedback}>{errors.confirmPassword}</div>}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Space size="small">
                  <Button type="primary" disabled={isSubmitting} onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button type="primary" onClick={handleReset}>
                    Reset
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
