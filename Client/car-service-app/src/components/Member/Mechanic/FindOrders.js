import React, { useState, useEffect } from "react";
import MechanicOrders from "../../../services/member/Mechanic/Mechanic_Orders";
import AuthService from "../../../services/member/auth_service";
import "./Mechanic.css"
import "../Admin/CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";

function FindOrders() {
  const [orders, setOrders] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const mechanic = AuthService.getCurrentMechanic();
    MechanicOrders.getInProcessOrders(mechanic.userId)
      .then((response) => {
        setOrders(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dynamicMechanicsLookUp = {
    Acceptat: "Acceptat",
    Refuzat: "Refuzat",
    Finalizat: "Finalizat",
  };
  const [columns, setColumns] = useState([
    { title: "Client", field: "customerName", editable: "never" },
    { title: "Masina", field: "carName", editable: "never" },
    { title: "Nr. Auto", field: "carNumber", editable: "never" },
    { title: "Serviciu", field: "serviceName", editable: "never" },
    { title: "Pret", field: "servicePrice", editable: "never" },
    {
      title: "Status",
      field: "status",
      lookup: dynamicMechanicsLookUp,
    },
  ]);

  const handleRowUpdate = (newData, oldData, resolve) => {
    let errorList = [];
    if (errorList.length < 1) {
      MechanicOrders.updateOrder(newData._id, newData.status)
        .then((res) => {
          const dataUpdate = [...orders];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setOrders([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
          enqueueSnackbar(res, {
            variant: "success",
          });
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  return (
    <div className="cars_container mleft">
      {orders ? (
        <MaterialTable
          title="Comenzi in lucru"
          columns={columns}
          data={orders}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                handleRowUpdate(newData, oldData, resolve);
              }),
          }}
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
      ) : (
        <div>
          <br />
          <h2 className="h1t">Nu exista noi comenzi.</h2>
        </div>
      )}
    </div>
  );
}

export default FindOrders;
