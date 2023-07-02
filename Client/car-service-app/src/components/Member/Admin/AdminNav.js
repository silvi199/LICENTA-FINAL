import React, { useEffect, useState } from "react";
import "../../Home/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import AuthService from "../../../services/member/auth_service";

function AdminNav() {
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
    <nav className={`nav ${show && "nav__scroll"}`}>
      <a href="/admin_home">
       
      </a>
      <div
        className={`nav__container nav__borderXwidth ${
          show && "nav__containerscroll nav__borderXwidthscroll"
        }`}
      >
        <NavLink
          onClick={logout}
          className={`nav__link ${show && "nav__linkscroll"}`}
          to="/login"
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
}

export default AdminNav;
