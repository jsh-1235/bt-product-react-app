import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Table, Button, Typography, Space } from "antd";

import UpdateModal from "./Sections/UpdateModal";
import DeleteModal from "./Sections/DeleteModal";

import { deleteUser, getUser } from "../../../actions/user";

const { Title } = Typography;

const expandable = { expandedRowRender: (record) => <p>{record.email}</p> };
const title = () => "User List";
const showHeader = true;
const footer = () => "BT Inc";
const pagination = { position: "bottom" };

export default function UserPage(props) {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    dispatch(getUser())
      .then((response) => {
        setUsers([]);

        // console.log(response.payload);

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

    setLoading(false);

    return function cleanup() {
      // console.log("cleanup");
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

          // console.log(response);
        }
      })
      .catch((err) => console.log(err.message));
  };

  //===================================================================================
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;

  const handleSelectChange = (selectedRowKeys) => {
    console.log("Selected row keys changed", selectedRowKeys);

    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
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
      sorter: (a, b) => a.email > b.email,
      filters: [
        {
          text: "Email",
          value: "jsh@naver.com",
        },
      ],
      onFilter: (value, record) => record.email.indexOf(value) === 0,
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

  // const scroll = { x: undefined };
  const scroll = { x: "fixed" };
  // const scroll = { x: "100vw" };

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
      <Table rowSelection={rowSelection} columns={columns} dataSource={users} loading={loading} bordered={false} size="small" expandable={expandable} title={title} pagination={{ position: ["none", "bottomCenter"] }} showHeader={showHeader} footer={footer} scroll={scroll} />
    </div>
  );
}
