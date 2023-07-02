import React, { useState, useEffect } from "react";
import AuthServices from "../../../services/member/auth_service";
import MechanicServices from "../../../services/member/Mechanic/Mechanic_Services";
import "./CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";

function Mechanic() {
  const [mechanic, setMechanic] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
    console.log("called");
  }, []);

  const [columns, setColumns] = useState([
    { title: "Nume", field: "name" },
    { title: "Email", field: "email" },
    { title: "Telefon", field: "mobile" },
    { title: "Status", field: "status" },
  ]);

  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });

  const [display, setdisplay] = useState(false);
  const openForm = () => {
    setdisplay(true);
  };

  const closeForm = () => {
    setdisplay(false);
  };

  const onSubmit = (values) => {
    AuthServices.registerMechanic(
      values.name,
      values.email,
      values.password,
      values.mobile
    )
      .then((res) => {
        enqueueSnackbar(res, {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRowDelete = (oldData, resolve) => {
    MechanicServices.deleteAccount(oldData._id)
      .then((res) => {
        const dataDelete = [...mechanic];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setMechanic([...dataDelete]);
        resolve();
        enqueueSnackbar(res, {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar("Delete failed! Server error", {
          variant: "error",
        });
        resolve();
      });
  };

  return (
    <div className="cars_container">
      <h3 className="subtitle">Administrare Mecanici</h3>
      <br />

      <button className="add-button" onClick={openForm}>Adauga mecanic</button>
      <br />
      <MaterialTable
        title="Mecanici"
        columns={columns}
        data={mechanic}
        localization={{
          header: {
            actions: "Actiuni"
          }
        }}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              handleRowDelete(oldData, resolve);
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

      {display ? (
        <div className="modalBg">

          <Container maxWidth="xs" className="form-to-add">
            <div className="login__form">
              <h4>Creaza Cont Mecanic</h4>
              <br />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      fullWidth
                      label="Nume"
                      inputRef={register({
                        required: "Nume obligatoriu",
                      })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Nr. Tel"
                      name="mobile"
                      inputRef={register({
                        required: "Nr. Tel obligatoriu",
                      })}
                    />
                    {errors.mobile && <span>{errors.mobile.message}</span>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Email"
                      name="email"
                      autoComplete="email"
                      inputRef={register({
                        required: "Email obligatoriu",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Adresa email invalida",
                        },
                      })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="password"
                      label="Parola"
                      type="password"
                      inputRef={register({
                        required: "Parola obligatorie",
                      })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="login_button"
                >
                  Creeaza Cont
                </Button>
              </form>
            </div>
            <button className="closeform" onClick={closeForm}>Inchide</button>

          </Container>
        </div>
      ) : null}
    </div>
  );
}

export default Mechanic;
