import React from "react";

import moment from "moment";

import { Formik } from "formik";
import * as Yup from "yup";

import { updateUser } from "../../../../actions/user";
import { useDispatch } from "react-redux";

import { Modal, Button, Form, Input, Space, message } from "antd";
import { EditFilled } from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 0,
      offset: 0,
    },
    sm: {
      span: 0,
      offset: 0,
    },
  },
};

export default function UpdateModal(props) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const dispatch = useDispatch();

  const { user } = props;

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("The job has been canceled.");

    setVisible(false);
  };

  const styles = {
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
    <div>
      <Button type="primary" shape="circle" icon={<EditFilled />} onClick={() => showModal()}></Button>
      <Modal title="Update" closable={true} footer={null} visible={visible} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <Formik
          initialValues={{
            firstName: `${user.firstName}`,
            lastName: `${user.lastName}`,
            email: `${user.email}`,
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
            setConfirmLoading(true);

            setTimeout(() => {
              setVisible(false);
              setConfirmLoading(false);

              let dataToSubmit = {
                _id: user._id,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
              };

              dispatch(updateUser(dataToSubmit)).then((response) => {
                if (response.payload.success) {
                  console.log(response.payload);

                  window.location.reload(false);
                } else {
                  message.error(response.payload.err, 3);
                }
              });

              actions.setSubmitting(false);

              actions.resetForm();
            }, 1000);
          }}>
          {(props) => {
            const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;

            return (
              <Form layout="vertical" {...formItemLayout} onSubmit={handleSubmit}>
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
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
}
