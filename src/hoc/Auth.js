import React, { useEffect } from "react";
import { auth } from "../actions/user";
import { location } from "../actions/routers";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//=========================================
// null  : Anyone
// false : User not logged in
// true  : Logged in user
//=========================================

export default function Auth(SpecificComponent, option, adminRoute = null) {
  function Check(props) {
    // console.group("Auth");
    // console.info(props, option, adminRoute);
    // console.groupEnd();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    let user = useSelector((state) => state.user);

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response.payload.isAuth, response.payload.isAdmin);

        if (!response.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            if (option === false) {
              navigate("/");
            }
          }
        }
      });

      dispatch(location(window.location.href, window.location.pathname));
    }, [dispatch, navigate]);

    return <SpecificComponent {...props} user={user} />;
  }

  return <Check />;
}
