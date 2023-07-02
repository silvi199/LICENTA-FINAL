import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthService from "../../services/customer/authentication/auth_service";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import "./Login.css";
import { useSnackbar } from "notistack";
import jaguar from "../../assets/images/jaguar.png";

export default function Login(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (values) => {
    AuthService.login(values.email, values.password).then((response) => {
      console.log(response);
      props.history.push("/cust_home");
    });
  };

  return (
    <div className="loginpage">
      <div className="spacer">
        <img src={jaguar}></img>
      </div>
      <div className="loginpart">
        <Container maxWidth="sm">
          <div className="login__form">
            <Typography component="h1" variant="h5" className="h1top">
              Portal Clienti
            </Typography>
            <hr />
            <Typography component="h1" variant="h5" className="h1t">
              Intra in cont
            </Typography>
            <Typography component="p" variant="p" className="pt">
              Introdu email-ul si parola pentru a intra in cont
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                type="email"
                name="email"
                inputRef={register({
                  required: "Email is Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <span className="span">{errors.email.message}</span>}
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Parola"
                type="password"
                name="password"
                inputRef={register({
                  required: "Parola obligatorie",
                })}
              />
              {errors.password && (
                <span className="span">{errors.password.message}</span>
              )}
              <Button className="login__button" type="submit" block color="primary">
                Intra in cont
              </Button>
              <Grid className="login__grid" container>
                <Grid item xs>
                  <Link className="link" to="/member_login">
                    Intra in cont ca membru
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="link" to="/register">
                    {"Nu ai cont? Inregistreaza-te"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
