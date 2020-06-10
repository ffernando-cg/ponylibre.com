import React from 'react';
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



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color:'#000000'
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
    color:'#ffffff'
  },
  whiteCol: {
    color: '#000000',
  },
}));

export default function SignUp() {
  const classes = useStyles();

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
                name="ponyname"
                variant="outlined"
                required
                fullWidth
                id="ponyname"
                label="Nombre Pony"
              />{/* SI QUIEREN QUE LA CONTRASEÑA SE MANDE COMO PARAMETRO EN EL URL USEN ESTO : name="ponyname" */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Nombre de usuario"
              />{/* SI QUIEREN QUE LA CONTRASEÑA SE MANDE COMO PARAMETRO EN EL URL USEN ESTO : name="username" */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Contraseña"
                type="password"
                id="password"
              />{/* SI QUIEREN QUE LA CONTRASEÑA SE MANDE COMO PARAMETRO EN EL URL USEN ESTO : name="password" */}
            </Grid>
            
          </Grid>
          <Button
            fullWidth
            variant="outlined"
            className={classes.submit}
            onClick={/* AQUI ES DONDE DEBE DE HACER LA FUNCION O LLAMAR A LA FUNCION PARA CREAR UN USUARIO  */ console.log("Registrado")}
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