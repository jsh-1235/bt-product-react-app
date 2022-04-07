import React from "react";
import { Modal, Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";

export default function DeleteModal(props) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Are you sure you want to delete the registered user?");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText(props.id);
    setConfirmLoading(true);

    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      props.handleRemove(props.id);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("The job has been canceled.");

    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" shape="circle" icon={<DeleteFilled />} onClick={() => showModal()}></Button>
      <Modal title="Delete" visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <p>{modalText}</p>
      </Modal>
    </div>
  );
}
