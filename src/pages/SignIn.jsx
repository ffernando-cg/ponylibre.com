import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux';
import { resetProductSearch } from '../actions/searchProducts'
import { searchUserByEmail } from '../actions/loginUser'
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${require("../images/Pony.png")})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginTop: theme.spacing(1),
    backgroundColor: "#C6006F",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#30B2BA',
    color: '#ffffff'
  },
}));

export default function SignInSide(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loading = useSelector((state) => _.get(state, "searchProducts.loading"));
  const results = useSelector((state) => _.get(state, "searchProducts.results"));
  const error = useSelector((state) => _.get(state, "searchProducts.error"));

  const [count, setCount] = useState(0)

  const renderPublicaciones = () => {
    if (results && results.length >= 1) {
      console.log(results);
      dispatch(resetProductSearch());
      props.history.push(`/mainpage`);
    } else if (loading) {
      return <CircularProgress size={90} color="primary" />;
    } else if (error) {
      return (
        <Alert severity="error">
          Oops, something terrible has happened! :(
        </Alert>
      );
    }
    return <div>Programador chafa</div>
  };

  useEffect(() => {
    //this.setState({ userEmail: '' });

    console.log(count)
  });


  const _handleTitleChange = (event) => {
    this.setState({ userEmail: event.target.value });
  }

  const handleLogin = () => {
    const { userEmail } = this.getState();

    if (!loading && !results && !error) {
      dispatch(searchUserByEmail(userEmail));
    }
    renderPublicaciones();
  };

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
              label="Nombre de usuario"
              name="username"
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              href="./mainPage"
              onClick={() => handleLogin()}
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
                {'Copyright © ponylibre.com 2020'}
              </Typography>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}