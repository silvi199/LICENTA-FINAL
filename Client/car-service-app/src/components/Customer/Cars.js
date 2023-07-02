import React, { useEffect, useState } from "react";
import CarouselComponent from "./CarouselComponent";
import CarService from "../../services/member/car/car_services";
import {
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  TextField,
} from "@material-ui/core";
import "./CSS/Brands.css";
import SearchIcon from "@material-ui/icons/Search";
import A4 from "../../assets/images/cars/audi/A4.png";
import A6 from "../../assets/images/cars/audi/A6.png";
import A8 from "../../assets/images/cars/audi/A8.png";
import bmw3er from "../../assets/images/cars/bmw/3er.png";
import bmw5er from "../../assets/images/cars/bmw/5er.png";
import bmw7er from "../../assets/images/cars/bmw/7er.png";
import x4m from "../../assets/images/cars/bmw/x4m.png";

function Cars(props) {
  const { match, history } = props;
  const { params } = match;
  const { brand } = params;

  const [cars, setCars] = useState([]);
  const [filter, setfilter] = useState("");

  const handleSearchChange = (e) => {
    setfilter(e.target.value);
  };

  const retrieveCars = () => {
    CarService.getCarsByBrand(brand)
      .then((response) => {
        setCars(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    retrieveCars();
  }, []);

  const getCarCards = (car) => {
    return (
      <Grid item xs={6} sm={4} md={3} lg={2} key={car._id}>
        <Card
          className="card cardcar"
          onClick={() => history.push(`/cust_home/services/${car._id}`)}
        >
          {car.name === "A4" && (
            <img src={A4}></img>
          )}
          {car.name === "A6" && (
            <img src={A6}></img>
          )}
          {car.name === "A8" && (
            <img src={A8}></img>
          )}
          {car.name === "Seria 3" && (
            <img src={bmw3er}></img>
          )}
          {car.name === "Seria 5" && (
            <img src={bmw5er}></img>
          )}
          {car.name === "Seria 7" && (
            <img src={bmw7er}></img>
          )}
           {car.name === "X4M" && (
            <img src={x4m}></img>
          )}
          <h2>{car.name}</h2>
        </Card>
      </Grid>
    );
  };

  return (
    <div className="mt200">
      <div className="brand">
        <h1 className="title">{`Available ${brand} Cars`}</h1>

        <div className="search">
          <SearchIcon className="searchIcon" />
          <TextField
            className="searchInput"
            label="Search for Cars"
            onChange={handleSearchChange}
          />
        </div>

        <Grid container spacing={3} className="grid_container">
          {cars.map((car) => car.name.includes(filter) && getCarCards(car))}
        </Grid>
      </div>
    </div>
  );
}

export default Cars;
