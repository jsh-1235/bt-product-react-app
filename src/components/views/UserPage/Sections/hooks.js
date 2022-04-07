import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { readUser } from "../../../../actions/user";

export function useReadUser(props) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    setUsers([]);

    dispatch(readUser())
      .then((response) => {
        console.log(response.payload);

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

    return function cleanup() {};
  }, [dispatch]);

  return [users, loading];
}
