import React, { useEffect, useState } from "react";
import "../Admin/CSS/AdminHome.css";
import "./Mechanic.css";
import HomeIcon from "@material-ui/icons/Home";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import AuthService from "../../../services/member/auth_service";


function MechanicHome(props) {
  const { history, location } = props;
  const itemList = [
    {
      text: "Acasa",
      icon: <HomeIcon />,
      path: "/mechanic_home",
      onClick: () => history.push("/mechanic_home"),
    },
    {
      text: "Comenzi",
      icon: <DriveEtaIcon />,
      path: "/mechanic_home/findOrders",
      onClick: () => history.push("/mechanic_home/findOrders"),
    },
    {
      text: "Comenzile mele",
      icon: <MonetizationOnIcon />,
      path: "/mechanic_home/myorders",
      onClick: () => history.push("/mechanic_home/myorders"),
    },
    {
      text: "Deconecteaza-te",
      icon: <ExitToAppIcon />,
      path: "/login",
      onClick: () => history.push("/login"),
    },
  ];
  useEffect(() => {
    const checkUserChange = () => {
      const mechanic = AuthService.getCurrentMechanic();
    };
    window.addEventListener('storage', checkUserChange);
    return () => window.removeEventListener('storage', checkUserChange);
  }, []);
  return (
    <div className="admin_home">
      <div className="mecanicleft">
      <h1 className="admintitle">Bine ai venit, {JSON.parse(localStorage.getItem("mechanic")).name}!</h1>
        <p className="admindesc">
          Aici poti vedea comenzile tale!
        </p>
      </div>
      <Drawer variant="permanent" className="drawer">
        <h1 className="titleh1">Car Service</h1>
        <hr />
        <List>
          {itemList.map((item, index) => {
            return (
              <ListItem button key={item.text} onClick={item.onClick}
                className={location.pathname === item.path && "active-item-list"}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

export default withRouter(MechanicHome);
