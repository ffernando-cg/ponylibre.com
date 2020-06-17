import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import {getLocalStorage } from "../actions/localStorage";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
    backgroundColor: "#87DCC0",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: "#666666",

    "&:hover": {
      background: "#404040",
      color: "#FFFFFF",
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  rootInside: {
    maxWidth: "90vh",
    marginTop: 25,
    marginLeft: "3vh",
  },
  input: {
    display: "none",
  },
  spacedHeight: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  spacedHeightBlank: {
    marginTop: "5vh",
  },
  buttonAccept: {
    background: "#008000",
    color: "#FFFFFF",

    "&:hover": {
      background: "#496442",
      color: "#FFFFFF",
    },
  },
  grid: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function NewProduct() {
  const classes = useStyles();
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    userEmail: getLocalStorage('ponys-username').correo,
    userPassword: getLocalStorage('ponys-username').password,
  });
  
  useEffect(() => {
    if (!getLocalStorage('ponys-username')) {
      history.push("/login");
    }
  });

  function _handleEmailChange(event) {
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

  function handleChange(event) {
    console.log(event.target.files[0]);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            PonyLibre
          </Typography>

          <nav>
            <Button
              href="mainpage"
              color="inherit"
              variant="outlined"
              className={classes.link}
            >
              Cancelar y regresar
            </Button>
          </nav>
        </Toolbar>
      </AppBar>
      <Grid container>
        <div className={classes.root}>
          <Grid container spacing={1} className={classes.grid}>
            <div className={classes.spacedHeight} />
            <Grid item md={5}>
              <Card className={classes.rootInside}>
                <CardActionArea>
                  <CardMedia
                    className={classes.image}
                    component="img"
                    alt="Producto"
                    name="ChangedImage"
                    id="ChangedImage"
                    image="https://pluspng.com/img-png/my-little-pony-png-download-my-little-pony-png-images-transparent-gallery-advertisement-1834.png" //IMAGEN A CAMBIAR
                    title="PonyProducto"
                  />
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item md={7} xs={10}>
              <div className={classes.spacedHeightBlank} />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Correo electronico"
                name="email"
                defaultValue={credentials.userEmail}
                onChange={(e) => _handleEmailChange(e)}
                autoFocus
              />

              <Divider className={classes.spacedHeight} />
              <TextField
                id="outlined-password-input"
                label="Contraseña"
                type="password"
                variant="outlined"
                defaultValue={credentials.userPassword}
                onChange={(e) => _handlePasswordChange(e)}
                fullWidth
              />

              <Divider className={classes.spacedHeight} />
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                onChange={handleChange} //FALTA ALTERNAR ESTO PARA PODER IMPLEMENTAR EL CAMBIO DE LA IMAGEN
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Divider className={classes.spacedHeight} />
              </label>
              <Button
                variant="contained"
                color="inherit"
                className={classes.buttonAccept}
                fullWidth
                size="large"
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </React.Fragment>
  );
}
