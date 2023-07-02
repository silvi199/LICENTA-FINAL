import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Customer from "./components/Customer/Customer";
import Admin from "./components/Member/Admin/Admin";
import Mechanic from "./components/Member/Mechanic/Mechanic";
import Login from "./components/Home/Login";
import Member_Login from "./components/Member/Member_Login";
import Navbar from "./components/Home/Navbar";
import Register from "./components/Home/Register";

function Layout() {
  const location = useLocation();

  const navbarPaths = ["/", "/login", "/member_login", "/register"];

  return (
    <>
      {navbarPaths.includes(location.pathname) && <Navbar />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cust_home" component={Customer} />
        <Route path="/admin_home" component={Admin} />
        <Route path="/mechanic_home" component={Mechanic} />
        <Route path="/login" component={Login} />
        <Route path="/member_login" component={Member_Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
