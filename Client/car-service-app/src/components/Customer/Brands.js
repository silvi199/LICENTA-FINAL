import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./CSS/Brands.css";
import CarService from "../../services/member/car/car_services";
import audi from "../../assets/images/brands/audi.png";
import bmw from "../../assets/images/brands/bmw.png";

function Brands(props) {
  const { history } = props;
  const [brands, setbrands] = useState([]);
  const [filter, setfilter] = useState("");

  const handleSearchChange = (e) => {
    setfilter(e.target.value);
  };

  const retrieveBrands = () => {
    CarService.getAllBrands()
      .then((response) => {
        setbrands(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    retrieveBrands();
  }, []);

  const getCarCard = (brand) => {
    return (
      <Grid item xs={6} sm={4} md={3} lg={2} key={brand}>
        <Card
          className="card"
          onClick={() => history.push(`/cust_home/cars/${brands[brand]}`)}
        >
          {brands[brand] === "Audi" && (
            <img src={audi}></img>
          )}
          {brands[brand] === "BMW" && (
            <img src={bmw}></img>
          )}
          <h2>{brands[brand]}</h2>
        </Card>
      </Grid>
    );
  };

  return (
    <div className="brand">
      <h1 className="title">Marci disponibile</h1>
      {/* {brands && brands.map((brand, index) => <li key={index}>{brand}</li>)} */}

      <div className="search">
        <SearchIcon className="searchIcon" />
        <TextField
          className="searchInput"
          label="Cauta o marca"
          onChange={handleSearchChange}
        />
      </div>

      {brands ? (
        <Grid container spacing={3} item className="grid_container">
          {Object.keys(brands).map(
            (brand) => brands[brand].includes(filter) && getCarCard(brand)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default withRouter(Brands);
