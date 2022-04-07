import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { readProduct } from "../../../../actions/product";

import { message } from "antd";

export function useReadProduct(props) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);

    setProducts([]);

    dispatch(readProduct())
      .then((response) => {
        console.log(response.payload);

        if (response.payload.success) {
          response.payload.products.forEach((product, index) => {
            setProducts((state) => [
              ...state,
              {
                key: index,
                id: product._id,
                title: product.title,
                description: product.description,
                remove: product._id,
                action: product,
              },
            ]);
          });
        } else {
          message.error(response.payload.err, 3);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);

    return function cleanup() {};
  }, [dispatch]);

  return [products, loading];
}
