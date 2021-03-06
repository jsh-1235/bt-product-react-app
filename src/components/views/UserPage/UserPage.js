import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useReadUser } from "./Sections/hooks";
import { deleteUser } from "../../../actions/user";

import { Table, Button, Typography, Space, notification, Popover, Checkbox } from "antd";
import { green } from "@ant-design/colors";

import UpdateModal from "./Sections/UpdateModal";
import DeleteModal from "./Sections/DeleteModal";

const { Title } = Typography;

const expandableContainer = { expandedRowRender: (record) => <p>{record.password}</p> };
const title = () => "User List";
const showHeader = true;
// const footer = () => "BT Inc";
const pagination = { position: ["none", "bottomCenter"] };

// const scroll = { x: undefined };
const scroll = { x: "fixed" };
// const scroll = { x: "100vw" };

export default function UserPage(props) {
  const dispatch = useDispatch();

  const [users, loading] = useReadUser(props);

  //===================================================================================
  const handleUpdate = () => {
    console.log("handleUpdate");
  };

  //===================================================================================
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
        }
      })
      .catch((err) => console.log(err.message));
  };

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

  //===================================================================================
  const [rowSelection, setRowSelection] = useState(false);
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
          text: "Admin",
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
          <UpdateModal user={user} handleUpdate={handleUpdate} />
          <DeleteModal id={user._id} handleRemove={handleRemove} />
        </Space>
      ),
    },
  ];

  const openNotificationWithIcon = (type) => {
    console.log(type);

    notification[type]({
      message: "Users",
      description: "User information management page",
    });
  };

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
      <Table bordered={false} size="small" loading={loading} columns={columns} dataSource={users} rowSelection={rowSelection ? handleRowSelection : null} expandable={expandable} title={title} pagination={pagination} showHeader={showHeader} footer={() => `Number of registered users ${users.length}`} scroll={scroll} />
    </div>
  );
}
