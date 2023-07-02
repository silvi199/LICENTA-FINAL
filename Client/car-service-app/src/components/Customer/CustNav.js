import React, { useEffect, useState } from "react";
import "../Home/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import AuthService from "../../services/customer/authentication/auth_service";

function CustNav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const logout = () => {
    AuthService.logout();
  };

  return (
    <nav className={`nav`}>
      <div
        className={`nav__container nav__borderXwidth ${
          show && "nav__containerscroll nav__borderXwidthscroll"
        }`}
      >
        <NavLink
          className={`nav__link ${show && "nav__linkscroll"}`}
          to="/cust_home"
        >
          Acasa
        </NavLink>
        <NavLink
          className={`nav__link ${show && "nav__linkscroll"}`}
          to="/cust_home/mybookings"
        >
          Comenzile mele
        </NavLink>
        <NavLink
          onClick={logout}
          className={`nav__link ${show && "nav__linkscroll"}`}
          to="/login"
        >
          Deconecteaza-te
        </NavLink>
      </div>
    </nav>
  );
}

export default CustNav;
