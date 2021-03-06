import React, { useEffect } from "react";
import { auth } from "../actions/user";
import { Location } from "../actions/page";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//=========================================
// null  : Anyone
// false : User not logged in
// true  : Logged in user
//=========================================

export default function Auth(SpecificComponent, option, adminRoute = null) {
  function Check(props) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    let user = useSelector((state) => state.user);
    let product = useSelector((state) => state.product);

    useEffect(() => {
      dispatch(auth()).then((response) => {
        // console.group("Auth");
        // console.info(response);
        // console.groupEnd();

        if (!response.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            console.log("This page is only accessible by administrators.");

            navigate("/");
          } else {
            if (option === false) {
              navigate("/");
            } else {
            }
          }
        }
      });

      dispatch(Location(window.location.href, window.location.pathname));
    }, [dispatch, navigate]);

    return <SpecificComponent {...props} user={user} product={product} />;
  }

  return <Check />;
}
