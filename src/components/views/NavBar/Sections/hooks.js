import { useState, useEffect } from "react";

export function useSearchKey(props) {
  const [key, setKey] = useState("");

  useEffect(() => {
    if (props.routers.location) {
      const results = props.routers.location.pathname.split("/").splice(1, 2);

      const compare = ["", "home", "product", "cart", "history", "login", "register"];

      const result = results.filter((target) => {
        const elements = compare.map((item) => {
          return target === item;
        });

        return !elements.every((element) => element === false);
      });

      setKey(result);

      // console.log(result);
    }
  }, [props.routers]);

  return [key, setKey];
}
