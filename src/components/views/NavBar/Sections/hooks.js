import { useState, useEffect } from "react";

export function useSearchKey(props) {
  const [key, setKey] = useState("");

  // console.log("useSearchKey", props);

  useEffect(() => {
    console.log("useSearchKey", props.page.payload);

    if (props?.page?.payload) {
      const results = props.page.payload.pathname.split("/").splice(1, 2);

      const compare = ["", "home", "user", "product", "register", "login"];

      const result = results.filter((target) => {
        const elements = compare.map((item) => {
          return target === item;
        });

        return !elements.every((element) => element === false);
      });

      setKey(result);
    }
  }, [props?.page?.payload]);

  return [key, setKey];
}
