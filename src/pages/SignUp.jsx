import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { resetProductSearch } from "../actions/searchProducts";
import { createUser, resetCreateUser } from "../actions/createUser";
import { setLocalStorage, getLocalStorage } from "../actions/localStorage";
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#000000'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#C6006F',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#30B2BA',
    color: '#ffffff'
  },
  whiteCol: {
    color: '#000000',
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => _.get(state, "createUser.loading"));
  const results = useSelector((state) => _.get(state, "createUser.results"));
  const error = useSelector((state) => _.get(state, "createUser.error"));
  const [credentials, setCredentials] = useState({
    userEmail: "",
    userPassword: "",
  });
  const history = useHistory();


  useEffect(() => {
    if (getLocalStorage('ponys-username')) {
      history.push("/mainpage");
    }
  });

  const renderPublicaciones = () => {
    if (results) {
      console.log(results);
      dispatch(resetProductSearch());
      setLocalStorage(results, "ponys-username");
      history.push("/mainpage");
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
    history.push("/login");
  };

  function _handleLogin(event) {

    if (credentials.userEmail && credentials.userPassword && !loading && !results && !error) {
      dispatch(createUser(credentials));
    }

    renderPublicaciones();
  }


  function _handleEmailChange(event) {
    //dispatch(createUser());

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Email"
                defaultValue={credentials.userEmail}
                onChange={(e) => _handleEmailChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Contraseña"
                type="password"
                id="password"
                defaultValue={credentials.userPassword}
                onChange={(e) => _handlePasswordChange(e)}
              />
            </Grid>

          </Grid>
          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={() => _handleLogin()}
          >
            Registrarme
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" className={classes.whiteCol}>
                ¿Ya tienes una cuenta? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}