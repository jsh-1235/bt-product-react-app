import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Table, Button, Typography, Space } from "antd";

import UpdateModal from "./Sections/UpdateModal";
import DeleteModal from "./Sections/DeleteModal";

import { deleteUser, getUser } from "../../../actions/user";

const { Title } = Typography;

export default function UserPage(props) {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(getUser())
      .then((response) => {
        setUsers([]);

        console.log(response.payload);

        if (response.payload.success) {
          response.payload.users.forEach((user, index) => {
            setUsers((state) => [
              ...state,
              {
                key: index,
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                action: user,
              },
            ]);
          });
        }
      })
      .catch((err) => console.log(err));

    return function cleanup() {
      console.log("cleanup");
    };
  }, []);

  const handleUpdate = () => {
    console.log("handleUpdate");
  };

  const handleRemove = (id) => {
    console.log(id);

    let dataToSubmit = {
      _id: id,
    };

    dispatch(deleteUser(dataToSubmit))
      .then((response) => {
        if (response.payload.success) {
          // setUsers(users.filter((user) => user.id !== id));

          window.location.reload(false);

          console.log(response);
        }
      })
      .catch((err) => console.log(err.message));
  };

  //===================================================================================
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;

  const onSelectChange = (selectedRowKeys) => {
    console.log("Selected row keys changed", selectedRowKeys);

    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleClear = () => {
    selectedRowKeys?.forEach((key) => {
      console.log(users[key], users[key].id);

      handleRemove(users[key].id);
    });

    setSelectedRowKeys([]);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
    },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      render: (user) => (
        <Space>
          <UpdateModal user={user} handleRemove={handleUpdate} />
          <DeleteModal id={user._id} handleRemove={handleRemove} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", margin: "1rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "0rem" }}>
        <Title level={2}>Users</Title>
      </div>
      {hasSelected && (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginBottom: "0.25rem" }}>
          <span style={{ margin: "0.25rem" }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}</span>
          <Button style={{ margin: "0rem" }} type="primary" disabled={!hasSelected} loading={false} onClick={handleClear}>
            Clear
          </Button>
        </div>
      )}
      <Table rowSelection={rowSelection} columns={columns} dataSource={users} />
    </div>
  );
}
