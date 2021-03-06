import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import OrderedProducts from './OrderedProducts';
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { searchOrderByUser } from "../actions/searchOrderByUser";
import { getLocalStorage } from '../actions/localStorage';
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  imageTitle: {
    height: 50
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
    backgroundColor: '#87DCC0',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: "#496442",

    "&:hover": {
      background: "#496442",
      color: "#FFFFFF",
    }
  },
  linkSecondary: {
    margin: theme.spacing(1, 1.5),
    color: "#000000",

    "&:hover": {
      background: "#FFFFF",
      color: "#FFFFFF",
    }
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  spacedwidth: {
    marginLeft: theme.spacing(4),
  },
  grid: {
    display: 'flex',
    justifyContent: 'center'
  }
}));


export default function MainPage() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const loading = useSelector((state) => _.get(state, "getOrderByUser.loading"));
  const results = useSelector((state) => _.get(state, "getOrderByUser.results"));
  const error = useSelector((state) => _.get(state, "getOrderByUser.error"));

  useEffect(() => {
    if (getLocalStorage('ponys-username')) {
      if (!loading && !results && !error) {
        dispatch(searchOrderByUser(getLocalStorage('ponys-username').correo));
      }
    }
  });

  const renderPublicaciones = () => {

    if (results) {
      if (results.id !== undefined) {
        console.log(results)
        return (<OrderedProducts order={results} />);
      }
    } else if (loading) {
      return <CircularProgress size={90} color="primary" />;
    } else if (error) {
      return (
        <Alert severity="error">
          Oops, something terrible has happened! :(
        </Alert>
      );
    }
    return (<Alert severity="error">
      No tienes órdenes
    </Alert>)
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
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
            <Button href="mainpage" color="inherit" variant="outlined" className={classes.link}>
              Regresar
          </Button>
          </nav>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.grid}>
        <Grid item md={2} />
        <Grid item md={8} sm={12}>
          {renderPublicaciones()}
        </Grid>
        <Grid item md={2} />
      </Grid>
    </React.Fragment>
  );
}