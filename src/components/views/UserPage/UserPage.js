import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Table, Button, Typography, Space, notification, Popover, Checkbox } from "antd";
import { green } from "@ant-design/colors";

import UpdateModal from "./Sections/UpdateModal";
import DeleteModal from "./Sections/DeleteModal";

import { deleteUser, getUser } from "../../../actions/user";

const { Title } = Typography;

// const expandable = { expandedRowRender: (record) => <p>{record.password}</p> };
const title = () => "User List";
const showHeader = true;
const footer = () => "BT Inc";
const pagination = { position: ["none", "bottomCenter"] };
const expandableContainer = { expandedRowRender: (record) => <p>{record.password}</p> };

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
  const [rowSelection, setRowSelection] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;

  const handleSelectChange = (selectedRowKeys) => {
    console.log("Selected row keys changed", selectedRowKeys);

    setSelectedRowKeys(selectedRowKeys);
  };

  const handleRowSelection = {
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
      ellipsis: true,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      ellipsis: false,
      sorter: (a, b) => a.email > b.email,
      filters: [
        {
          text: "Email",
          value: "jsh@naver.com",
        },
      ],
      onFilter: (value, record) => record.email.indexOf(value) === 0,
    },
    // {
    //   title: "Password",
    //   dataIndex: "password",
    // },
    {
      title: "Action",
      dataIndex: "action",
      ellipsis: true,
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

  const openNotificationWithIcon = (type) => {
    console.log(type);

    notification[type]({
      message: "Users",
      description: "User information management page",
    });
  };

  // const [expandable, setExpandable] = useState(expandableContainer);
  const [expandable, setExpandable] = useState(undefined);

  const onChange = (event) => {
    console.log(event.target.checked);

    switch (event.target.name) {
      case "Checkbox":
        if (!event.target.checked) {
          setSelectedRowKeys([]);
        }

        setRowSelection(event.target.checked);
        break;
      case "Expandable":
        setExpandable(expandable ? undefined : expandableContainer);
        break;
      default:
        break;
    }
  };

  const content = (
    <div>
      <Checkbox name="Checkbox" defaultChecked={expandable ? true : false} onChange={onChange}>
        Checkbox
      </Checkbox>
      <Checkbox name="Expandable" defaultChecked={false} onChange={onChange}>
        Expandable
      </Checkbox>
    </div>
  );

  return (
    <div style={{ width: "100%", margin: "1rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "0rem" }}>
        <Title level={2} onClick={openNotificationWithIcon.bind(this, "success")}>
          Users
        </Title>
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: selectedRowKeys.length !== 0 ? "space-between" : "flex-end", alignItems: "center", marginBottom: "0.25rem" }}>
        {hasSelected && rowSelection && (
          <Space>
            <Button style={{ margin: "0rem" }} type="primary" disabled={!hasSelected} loading={false} onClick={handleClear}>
              Clear
            </Button>
            <span style={{ margin: "0.25rem" }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}</span>
          </Space>
        )}
        <Popover content={content} title="Option">
          <Button type="primary" style={{ backgroundColor: green[6], borderColor: green[6] }}>
            Option
          </Button>
        </Popover>
      </div>
      <Table loading={loading} columns={columns} dataSource={users} rowSelection={rowSelection ? handleRowSelection : null} bordered={false} size="small" expandable={expandable} title={title} pagination={pagination} showHeader={showHeader} footer={footer} scroll={scroll} />
    </div>
  );
}
