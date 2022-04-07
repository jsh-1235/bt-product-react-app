import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useReadProduct } from "./Sections/hooks";
import { deleteProduct } from "../../../actions/product";

import { Table, Button, Typography, Space, Popover, Checkbox, message } from "antd";
import { green } from "@ant-design/colors";

import CreateModal from "./Sections/CreateModal";
import UpdateModal from "./Sections/UpdateModal";
import DeleteModal from "./Sections/DeleteModal";

const { Title } = Typography;

const expandableContainer = { expandedRowRender: (record) => <p>{record.description}</p> };
const title = () => "User List";
const showHeader = true;
// const footer = () => "BT Inc";
const pagination = { position: ["none", "bottomRight"] };

// const scroll = { x: undefined };
const scroll = { x: "fixed" };
// const scroll = { x: "100vw" };

export default function ProductPage(props) {
  const dispatch = useDispatch();

  const [products, setProducts, loading] = useReadProduct(props);

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

    dispatch(deleteProduct(dataToSubmit))
      .then((response) => {
        if (response.payload.success) {
          setProducts(products.filter((product) => product.id !== id));

          // window.location.reload(false);
        } else {
          message.error(response.payload.err, 3);
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
      console.log(products[key], products[key].id);

      handleRemove(products[key].id);

      setSelectedRowKeys([]);
    });
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
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   render: (product) => <img style={{ width: "60px" }} title={product.title} alt="product" src={product.image} />,
    // },
    {
      title: "Title",
      dataIndex: "title",
      ellipsis: true,
      sorter: (a, b) => a.title > b.title,
      filters: [
        {
          text: "BT-CEAB2",
          value: "BT-CEAB2",
        },
      ],
      onFilter: (value, record) => record.title.indexOf(value) === 0,
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      ellipsis: true,
      fixed: "right",
      width: 100,
      render: (product) => (
        <Space>
          <UpdateModal product={product} handleUpdate={handleUpdate} />
          <DeleteModal id={product._id} handleRemove={handleRemove} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", margin: "1rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "0rem" }}>
        <Title level={2}>BT Products</Title>
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
        <Space>
          {/* <Button type="primary">Create</Button> */}
          <CreateModal handleRemove={handleUpdate} />
          <Popover content={content} title="Option">
            <Button type="primary" style={{ backgroundColor: green[6], borderColor: green[6] }}>
              Option
            </Button>
          </Popover>
        </Space>
      </div>
      <Table bordered={false} size="small" loading={loading} columns={columns} dataSource={products} rowSelection={rowSelection ? handleRowSelection : null} expandable={expandable} title={title} pagination={pagination} showHeader={showHeader} footer={() => `Number of registered products ${products.length}`} scroll={scroll} />
    </div>
  );
}
