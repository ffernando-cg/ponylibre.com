import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Products from "./Product";
import Publications from "./Publicacion";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from '@material-ui/lab/Alert'
import _ from "lodash";
import { searchProduct } from "../actions/searchProducts";
import TextField from '@material-ui/core/TextField';
import { getLocalStorage } from '../actions/localStorage';
import { useHistory } from "react-router-dom";
import { searchOrderByUser, resetSearchOrderByUser } from "../actions/searchOrderByUser";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
    backgroundColor: "#87DCC0",
  },
  toolbarTitle: {
    flexGrow: 1
  },
  imageTitle: {
    height: 50
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: "#496442",

    "&:hover": {
      background: "#496442",
      color: "#FFFFFF",
    },
  },
  linkSecondary: {
    margin: theme.spacing(1, 1.5),
    color: "#000000",

    "&:hover": {
      background: "#FFFFF",
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
  spacedwidth: {
    marginLeft: theme.spacing(4),
  },
  grid: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function MainPage() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const loading = useSelector((state) => _.get(state, "searchProducts.loading"));
  const results = useSelector((state) => _.get(state, "searchProducts.results"));
  const error = useSelector((state) => _.get(state, "searchProducts.error"));

  const loadingOrder = useSelector((state) => _.get(state, "getOrderByUser.loading"));
  const resultsOrder = useSelector((state) => _.get(state, "getOrderByUser.results"));
  const errorOrder = useSelector((state) => _.get(state, "getOrderByUser.error"));


  const history = useHistory();

  useEffect(() => {
    //localStorage.removeItem('ponys-username');
    if (!getLocalStorage('ponys-username')) {
      history.push("/login");
    }
    if (!loading && !results && !error) {
      dispatch(searchProduct());
    }
    if (!loadingOrder && !resultsOrder && !errorOrder) {
      dispatch(searchOrderByUser(getLocalStorage('ponys-username').correo));
    }
  });

  const renderPublicaciones = () => {
    if (results && results.length >= 1 && resultsOrder) {
      var ubu = {};
      if (resultsOrder.id == undefined) {
        ubu.id = null;
      } else {
        ubu.id = resultsOrder.id
      }

      return (results.map((p) => (
        <Publications Key={p.id} {...p} idOrden={ubu.id} usuario={getLocalStorage('ponys-username').correo} />
      )));
    } else if (loading) {
      return <CircularProgress size={90} color="primary" />;
    } else if (error) {
      return (
        <Alert severity="error">
          Oops, something terrible has happened! :(
        </Alert>
      );
    }
    return <CircularProgress size={90} color="primary" />;
  };

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
          <img src='https://ponylibre.s3-us-west-1.amazonaws.com/ponylibre.com+logo.png' className={classes.imageTitle}></img>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
          </Typography>

          <nav>
            <Button
              href="createnewpost"
              color="inherit"
              variant="outlined"
              className={classes.link}
            >
              Crear nueva publicacion
            </Button>
            <Button
              color="inherit"
              href="myprofile"
              className={classes.linkSecondary}
            >
              Mi cuenta
            </Button>
            <label className={classes.spacedwidth} />
            <Button
              color="inherit"
              href="myorders"
              className={classes.linkSecondary}
              onClick={() => { dispatch(resetSearchOrderByUser()) }}
            >
              Mis ordenes
            </Button>
            <label className={classes.spacedwidth} />
            <Button
              color="inherit"
              href="login"
              onClick={() => { localStorage.removeItem('ponys-username'); }}
              className={classes.linkSecondary}
            >
              Salir
            </Button>
          </nav>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.grid}>
        {renderPublicaciones()}
      </Grid>
    </React.Fragment>
  );
}
