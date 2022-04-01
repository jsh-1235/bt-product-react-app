import React from "react";
import { Skeleton } from "antd";
import { Empty } from "antd";

function NotFound() {
  console.log("NotFound");

  return (
    <div>
      <Skeleton></Skeleton>
      <Empty />
    </div>
  );
}

export default NotFound;
