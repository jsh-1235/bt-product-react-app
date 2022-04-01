import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Typography } from "antd";
const { Title } = Typography;

export default function User(props) {
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
      dataIndex: "remove",
      fixed: "right",
      width: 100,
      render: (id) => <Button onClick={() => removeItem(id)}>Remove</Button>,
    },
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // console.log("componentDidMount");
    // console.log(process.env.REACT_APP_PROXY);

    console.log(props);

    axios
      .get(`${process.env.REACT_APP_PROXY}/users`)
      .then((response) => {
        setUsers([]);

        // console.log(response.data.users);
        // console.log(typeof response.data.users, Array.isArray(response.data.users));

        // setUsers([...users, ...response.data.products]);

        response.data.users.forEach((user, index) => {
          setUsers((state) => [
            ...state,
            {
              key: index,
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              password: user.password,
              remove: user._id,
            },
          ]);
        });

        // console.log(users);
      })
      .catch((err) => console.log(err.message));

    return function cleanup() {
      console.log("cleanup");
    };
  }, []);

  const removeItem = (id) => {
    console.log(id);

    let dataToSubmit = {
      _id: id,
    };

    axios
      .post(`${process.env.REACT_APP_PROXY}/users/delete`, dataToSubmit)
      .then((response) => {
        setUsers(users.filter((user) => user.id !== id));
        // console.log(response.data);
      })
      .catch((err) => console.log(err.message));
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    console.log("Selected row keys changed", selectedRowKeys);

    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleClear = () => {
    selectedRowKeys?.forEach((key) => {
      console.log(users[key], users[key].id);

      removeItem(users[key].id);
    });

    setSelectedRowKeys([]);
  };

  const handleUpdate = () => {};

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
      <hr />
      <Button style={{ margin: "0rem" }} type="primary" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
}
