import React from "react";

import moment from "moment";

import { Formik } from "formik";
import * as Yup from "yup";

import { updateProduct } from "../../../../actions/product";
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

  const { product } = props;

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
            title: `${product.title}`,
            description: `${product.description}`,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Title is required."),
            description: Yup.string().required("Description is required."),
          })}
          onSubmit={(values, actions) => {
            setConfirmLoading(true);

            setTimeout(() => {
              setVisible(false);
              setConfirmLoading(false);

              let dataToSubmit = {
                _id: product._id,
                title: values.title,
                description: values.description,
                image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
              };

              dispatch(updateProduct(dataToSubmit)).then((response) => {
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
                <Form.Item required label="Title">
                  <Input id="title" autoComplete="off" placeholder="Enter your title" type="text" value={values.title} onChange={handleChange} onBlur={handleBlur} className={errors.title && touched.title ? styles.textInputError : styles.textInput} />
                  {errors.title && touched.title && <div style={styles.inputFeedback}>{errors.title}</div>}
                </Form.Item>

                <Form.Item required label="Description">
                  <Input id="description" autoComplete="off" placeholder="Enter your description" type="text" value={values.description} onChange={handleChange} onBlur={handleBlur} className={errors.description && touched.description ? styles.textInputError : styles.textInput} />
                  {errors.description && touched.description && <div style={styles.inputFeedback}>{errors.description}</div>}
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
