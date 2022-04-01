import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Typography } from "antd";
const { Title } = Typography;

export default function Main() {
  const columns = [
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   render: (product) => <img style={{ width: "60px" }} title={product.title} alt="product" src={product.image} />,
    // },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      dataIndex: "remove",
      fixed: "right",
      width: 100,
      render: (id) => <Button onClick={() => removeItem(id)}>Remove</Button>,
    },
  ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("componentDidMount");

    console.log(process.env.REACT_APP_PROXY);

    axios
      .get(`${process.env.REACT_APP_PROXY}/product`)
      .then((response) => {
        setProducts([]);

        console.log(response.data.products);
        console.log(typeof response.data.products, Array.isArray(response.data.products));

        // setProducts([...products, ...response.data.products]);

        response.data.products.forEach((product, index) => {
          setProducts((state) => [
            ...state,
            {
              key: index,
              id: product._id,
              title: product.title,
              description: product.description,
              remove: product._id,
            },
          ]);
        });

        // console.log(products);
      })
      .catch((err) => console.log(err.message));

    return function cleanup() {
      console.log("cleanup");
    };
  }, []);

  const removeItem = (id) => {
    console.log(id);
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

  const clearHandler = () => {
    selectedRowKeys?.forEach((key) => {
      console.log(products[key], products[key].id);

      removeItem(products[key].id);

      setSelectedRowKeys([]);
    });
  };

  return (
    <div style={{ width: "100%", margin: "1rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "0rem" }}>
        <Title level={2}>BT Products</Title>
      </div>
      {hasSelected && (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginBottom: "0.25rem" }}>
          <span style={{ margin: "0.25rem" }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}</span>
          <Button style={{ margin: "0rem" }} type="primary" disabled={!hasSelected} loading={false} onClick={clearHandler}>
            Clear
          </Button>
        </div>
      )}
      <Table rowSelection={rowSelection} columns={columns} dataSource={products} />
    </div>
  );
}
