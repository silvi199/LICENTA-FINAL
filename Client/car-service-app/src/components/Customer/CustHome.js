import React, { useEffect, useState } from "react";
import CarouselComponent from "./CarouselComponent";
import Brands from "./Brands";
import "./CSS/Client.css"
import AuthService from "../../services/customer/authentication/auth_service";

function CustHome(props) {

  return (
    <div style={{
      marginTop: 200
    }}>
      <h1 className="clientwelcome">Bine ai venit, {JSON.parse(localStorage.getItem("customer")).name}!</h1>
      <Brands />
    </div>
  );
}

export default CustHome;
