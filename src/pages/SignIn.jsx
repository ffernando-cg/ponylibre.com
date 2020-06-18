import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { resetProductSearch } from "../actions/searchProducts";
import {
  searchUserByEmail,
  resetSearchUserByEmail,
  resetErrorSearchUserByEmail,
} from "../actions/loginUser";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { setLocalStorage, getLocalStorage } from "../actions/localStorage";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${require("../images/Pony.png")})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginTop: theme.spacing(1),
    backgroundColor: "#C6006F",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#30B2BA",
    color: "#ffffff",
  },
}));

export default function SignInSide(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loading = useSelector((state) => _.get(state, "login.loading"));
  const results = useSelector((state) => _.get(state, "login.results"));
  const error = useSelector((state) => _.get(state, "login.error"));
  const [credentials, setCredentials] = useState({
    userEmail: "",
    userPassword: "",
  });
  const history = useHistory();

  useEffect(() => {
    if (getLocalStorage('ponys-username')) {
      history.push("/mainpage");
    }


    const { userEmail } = credentials;

    if (userEmail && !loading && !results && !error) {
      dispatch(searchUserByEmail(userEmail));
    } else if (!loading && !results && error) {
      dispatch(resetErrorSearchUserByEmail());
    }


  });

  const renderPublicaciones = () => {
    if (results) {
      console.log(results);
      if (
        results.correo === credentials.userEmail &&
        results.password === credentials.userPassword
      ) {
        dispatch(resetProductSearch());
        setLocalStorage(results, "ponys-username");
        history.push("/mainpage");
      } else {
        return (
          <Alert severity="error">Usuario o Contraseña Incorrectos :(</Alert>
        );
      }
    } else if (error) {
      return (
        <Alert severity="error">
          Oops, something terrible has happened! :(
        </Alert>
      );
    }
    return <Alert severity="error">
      Oops, something terrible has happened! :(
      </Alert>;
  };

  function _handleLogin(event) {
    renderPublicaciones();
  }

  function _handleEmailChange(event) {
    dispatch(resetSearchUserByEmail());

    setCredentials({
      userEmail: event.target.value,
      userPassword: credentials.userPassword,
    });
  }

  function _handlePasswordChange(event) {
    setCredentials({
      userEmail: credentials.userEmail,
      userPassword: event.target.value,
    });
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email"
              name="username"
              defaultValue={credentials.userEmail}
              onChange={(e) => _handleEmailChange(e)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              defaultValue={credentials.userPassword}
              onChange={(e) => _handlePasswordChange(e)}
            />
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => _handleLogin()}
            >
              Inicia sesión
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href={"/register"} variant="body2">
                  {"¿No tienes una cuenta? ¡Crea una!"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © ponylibre.com 2020"}
              </Typography>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
