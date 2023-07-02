import React, { useState, useEffect, useMemo } from "react";
import AdminOrders from "../../../services/member/orders.js/admin_orders";
import MechanicServices from "../../../services/member/Mechanic/Mechanic_Services";
import "./CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [mechanic, setMechanic] = useState([]);
  const getAllMecahnic = () => {
    MechanicServices.findAll()
      .then((response) => {
        setMechanic(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllMecahnic();
  }, []);

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const getPlacedOrders = () => {
    AdminOrders.findPlacedOrders()
      .then((response) => {
        setOrders(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCompletedOrders = () => {
    AdminOrders.findCompletedOrders()
      .then((res) => {
        setCompletedOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPlacedOrders();
    getCompletedOrders();
  }, []);

  const dynamicMechanicsLookUp = useMemo(() => mechanic.reduce((acc, m) => {
    acc[m._id] = m.name;
    return acc;
  }, {}), [mechanic]);

  console.log("mechanic: ", mechanic);
  console.log("dyn: ", dynamicMechanicsLookUp);

  const [column, setColumn] = useState([
    { title: "Client", field: "customerName", editable: "never" },
    { title: "Masina", field: "carName", editable: "never" },
    { title: "Nr. Auto", field: "carNumber", editable: "never" },
    { title: "Adresa", field: "custAddress", editable: "never" },
    { title: "Serviciu", field: "serviceName", editable: "never" },
    { title: "Pret", field: "servicePrice", editable: "never" },
  ]);

  const handleRowUpdate = (newData, oldData, resolve) => {
    let errorList = [];
    if (errorList.length < 1) {
      AdminOrders.assignOrder(newData._id, newData.mechanicId)
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

  const [display, setdisplay] = useState(false);
  const openTable = () => {
    setdisplay(true);
  };

  const closeTable = () => {
    setdisplay(false);
  };
  return (
    <div className="cars_container">
      <br />

      <button className="add-button" onClick={openTable}>Verifica Comenzi Terminate</button>
      <br />
      {orders ? (
        <MaterialTable
          title="Comenzi Active"
          columns={[
            { title: "Client", field: "customerName", editable: "never" },
            { title: "Masina", field: "carName", editable: "never" },
            { title: "Nr. Auto", field: "carNumber", editable: "never" },
            { title: "Adresa", field: "custAddress", editable: "never" },
            { title: "Serviciu", field: "serviceName", editable: "never" },
            { title: "Pret", field: "servicePrice", editable: "never" },
            { title: "Atribuie Mecanic", field: "mechanicId", lookup: dynamicMechanicsLookUp },
          ]}
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
            exportButton: true,
          }}
          style={{
            paddingInline: "10px"
          }}
        />

      ) : (
        <div>
          <br />
          <h2 className="text-white">Nu exista noi comenzi</h2>
        </div>
      )}

      <br />
      <br />
      <br />

      {display ? (
        <div className="modalBg">
          <div className="finished-orders">
          <button className="add-button" onClick={closeTable}>Inchide</button>
          <br />
            <MaterialTable
              title="Comenzi terminate"
              columns={column}
              data={completedOrders}
              options={{
                headerStyle: {
                  backgroundColor: "transparent",
                  color: "#FFF",
                },
                exportButton: true,
              }}
              style={{
                paddingInline: "10px"
              }}
            />
            
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Orders;
