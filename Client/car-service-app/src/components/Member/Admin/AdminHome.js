import React, { useEffect, useState } from "react";
import "./CSS/AdminHome.css";
import HomeIcon from "@material-ui/icons/Home";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import BallotIcon from "@material-ui/icons/Ballot";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AdminOrders from "../../../services/member/orders.js/admin_orders";
import AuthService from "../../../services/member/auth_service";
import wallet from "../../../assets/wallet.svg";
import doc from "../../../assets/doc.svg";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

function AdminHome(props) {
  const { history, location } = props;
  const [orders, setOrders] = useState([]);

  const itemList = [
    {
      text: "Acasa",
      icon: <HomeIcon />,
      path: "/admin_home",
      onClick: () => history.push("/admin_home"),
    },
    {
      text: "Masini",
      icon: <DriveEtaIcon />,
      path: "/admin_home/cars",
      onClick: () => history.push("/admin_home/cars"),
    },
    {
      text: "Servicii",
      icon: <BallotIcon />,
      path: "/admin_home/packages",
      onClick: () => history.push("/admin_home/packages"),
    },
    {
      text: "Mecanici",
      icon: <SupervisorAccountIcon />,
      path: "/admin_home/mechanics",
      onClick: () => history.push("/admin_home/mechanics"),
    },
    {
      text: "Comenzi",
      icon: <MonetizationOnIcon />,
      path: "/admin_home/orders",
      onClick: () => history.push("/admin_home/orders"),
    },
    {
      text: "Deconectare",
      icon: <ExitToAppIcon />,
      path: "/login",
      onClick: () => history.push("/login"),
    },
  ];

  const getCompletedOrders = () => {
    AdminOrders.findCompletedOrders()
      .then((res) => {
        setOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCompletedOrders();
  }, []);
  useEffect(() => {
    const checkUserChange = () => {
      const admin = AuthService.getAdmin();
      if (admin) getCompletedOrders();
    };

    window.addEventListener('storage', checkUserChange);
    return () => window.removeEventListener('storage', checkUserChange);
  }, []);
  return (
    <div className="admin_home">
      <div></div>
      <div className="stats">
        <div className="box">
          <div className="boxleft">
            <span className="sub1">Total incasari:{` `}</span>
            <div className="sub2">
              {orders && orders
                .map((order) => order.servicePrice)
                .reduce((prev, next) => prev + next, 0).toLocaleString()}
              {` `}
              RON
            </div>
          </div>
          <div className="imgwrap">
            <img src={wallet}></img>
          </div>
        </div>
        <div className="box">
          <div className="boxleft">
            <span className="sub1">Nr. Comenzi:{` `}</span>
            <div className="sub2">
              {orders && orders.length}
            </div>
          </div>
          <div className="imgwrap">
            <img src={doc}></img>
          </div>
        </div>
      </div>
      {location.pathname === "/admin_home" && (
        <>
          <h1 className="admintitle">Bine ai venit, Admin!</h1>
          <p className="admindesc">
            Aici poti vedea statistici despre incasari, comenzi, mecanici si masini.
            Continua prin a alege o optiune din meniul din stanga.
          </p>
        </>
      )}

      <Drawer variant="permanent" className="drawer">
        <h1>Car Service</h1>
        <hr />
        <List>
          {itemList.map((item, index) => {
            return (
              <ListItem button key={item.text} onClick={item.onClick}
                className={location.pathname === item.path && "active-item-list"}>
                {item.icon && <ListItemIcon style={{ color: "white" }}>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

export default withRouter(AdminHome);
