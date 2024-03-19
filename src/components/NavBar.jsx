import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.styles.scss";
import CartIcon from "./CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { loginFailed } from "../redux/action/user/user.action";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(loginFailed());
  };

  return (
    <>
      <div className="header">
        <div className="logo-container">
          <Link
            className="logo-container"
            style={{ textDecoration: "none" }}
            to="/"
          >
            <img
              src="../src/assets/favicon.ico"
              alt="logo"
              className="logo"
            ></img>
            <div
              style={{
                fontSize: "2rem",
                padding: "0px 20px",
                color: "black",
                fontWeight: "500",
              }}
            >
              UK
            </div>
          </Link>
        </div>
        <div className="options">
          <Link className="option" to="/shop">
            SHOP
          </Link>
          {user ? (
            <>
              <Link className="option" onClick={handleOnClick}>
                SIGN OUT
              </Link>
            </>
          ) : (
            <>
              <Link className="option" to="/signIn">
                SIGN IN
              </Link>
            </>
          )}
          <Link className="option" to="/contact">
            CONTACT
          </Link>
          <Link className="option" to="/view-products">
            PRODUCT
          </Link>
          <Link className="option" to="/view-categories">
            CATEGORY
          </Link>
          <CartIcon />
        </div>
      </div>
    </>
  );
};

export default NavBar;
