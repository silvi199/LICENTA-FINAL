import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthService from "../../services/customer/authentication/auth_service";
import jaguar from "../../assets/images/jaguar.png";
import Typography from "@material-ui/core/Typography";

export default function Register(props) {
  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (values) => {
    AuthService.register(values.name, values.email, values.password).then(
      (respone) => {
        props.history.push("/login");
      }
    );
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
              Creeaza un cont nou
            </Typography>
            <Typography component="p" variant="p" className="pt">
              Introdu numele, email-ul si parola pentru a creea un cont
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Nume"
                placeholder="Nume"
                type="name"
                name="name"
                inputRef={register({
                  required: "Nume obligatoriu",
                })}
              />
              {errors.name && <span className="span">{errors.name.message}</span>}
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email"
                type="email"
                name="email"
                placeholder="Email"
                inputRef={register({
                  required: "Email obligatoriu",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email invalid",
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
                placeholder="Parola"
                inputRef={register({
                  required: "Parola obligatorie",
                  minLength: {
                    value: 6,
                    message: "Minim 6 caractere",
                  },
                })}
              />
              {errors.password && (
                <span className="span">{errors.password.message}</span>
              )}
              <Button className="login__button" type="submit" block color="primary">
                Creeaza Cont
              </Button>
              <Grid className="login__grid" container>
                <Grid item>
                  <Link className="link" to="/login">
                    {"Ai deja un cont? Intra in cont"}
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