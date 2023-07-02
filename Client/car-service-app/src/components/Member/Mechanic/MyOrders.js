import React, { useState, useEffect } from "react";
import MechanicOrders from "../../../services/member/Mechanic/Mechanic_Orders";
import AuthService from "../../../services/member/auth_service";
import "../Admin/CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const mechanic = AuthService.getCurrentMechanic();
    MechanicOrders.getAllOrders(mechanic.userId)
      .then((response) => {
        setOrders(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [columns, setColumns] = useState([
    { title: "Client", field: "customerName" },
    { title: "Masina", field: "carName" },
    { title: "Nr. Auto", field: "carNumber" },
    { title: "Serviciu", field: "serviceName" },
    { title: "Pret", field: "servicePrice" },
    { title: "Status", field: "status" },
    {title: "Review", field: "review"}
  ]);

  return (
    <div className="cars_container mleft">
      <MaterialTable
        title="Comenzile mele"
        columns={columns}
        data={orders}
        options={{
          headerStyle: {
            backgroundColor: "transparent",
            color: "#FFF",
          },
        }}
        style={{
          paddingInline: "10px"
        }}
      />
    </div>
  );
}

export default MyOrders;
