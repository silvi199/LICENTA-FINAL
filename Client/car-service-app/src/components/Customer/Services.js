import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./CSS/Services.css";
import Package from "../../services/member/package/package_services";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Services(props) {
  const { match, history } = props;
  const { params } = match;
  const { car } = params;
  const classes = useStyles();

  const [services, setServices] = useState([]);

  useEffect(() => {
    Package.getAllServices()
      .then((response) => {
        setServices(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getServiceCards = (res) => {
    var type,
      where = "";
    if (res.serviceType == 1) {
      type = "Mentenanta";
    } else {
      type = "Intretinere";
    }

    if (res.where == 1) {
      where = "La service";
    } else {
      where = "La domiciliu";
    }
    return (
      <Grid item xs={12} sm={12} md={6} lg={6} key={res._id}>
        <Card
          className="service_card"
          variant="outlined"
          onClick={() =>
            history.push(`/cust_home/order/car/${car}/service/${res._id}`)
          }
        >
          <div>
            <h1 className="name">
              {res.name}
            </h1>
            <h2 className="type">
              {type}, {where}
            </h2>
            <div className="flex-chips">
              <div className="styled-chip">
                <span className="chip-t">Pret</span>
                <span className="chip-v">{res.price} RON</span>
              </div>
              <div className="styled-chip">
                <span className="chip-t">Durata</span>
                <span className="chip-v">{res.timeRequired}</span>
              </div>
            </div>
            <p className="description-service">
              {res.description}
            </p>
            <button className="buy_button">Rezerva</button>
          </div>

        </Card>
      </Grid>
    );
  };

  return (
    <div className="container mtbig">
      <button className="changecar" onClick={() => history.push(`/cust_home`)}>&lt;{` `}Inapoi</button>
      <hr />
      <Grid container spacing={5} className="grid_container">
        {services.map((res) => getServiceCards(res))}
      </Grid>
    </div>
  );
}
