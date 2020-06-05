import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
    backgroundColor: '#87DCC0'
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
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
  rootInside:{
    maxWidth: "75vh",
    marginTop: 25,
    marginRight: "35vh"
  },
  input: {
    display: 'none',
  },
  spacedHeight:{
    marginTop: theme.spacing(3),  
    marginBottom: theme.spacing(2),
  },
  spacedHeightBlank:{
    marginTop: "5vh"
  }
}));

export default function NewProduct() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            PonyLibre
          </Typography>
          
          <nav>
          <Button href="mainpage" color="Secondary" variant="outlined" className={classes.link}>
            Cancelar y regresar
          </Button>
          </nav>
        </Toolbar>
      </AppBar>
      <Grid container >
      <div className={classes.root}>
      <Grid container spacing={2}>
        <div className={classes.spacedHeight} />
          <Grid item md={4}>
          <div className={classes.spacedHeightBlank} />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span" fullWidth>
              Subir imagen
            </Button>
          </label>

            <Divider className={classes.spacedHeight} />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre del producto"
              name="name"
              autoFocus
            />

              <Divider className={classes.spacedHeight} />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              id="description"
              label="Descripcion del producto"
              name="description"
            />
          </Grid>

          <Grid item sm={0} md={1}></Grid>
          <Grid item md={7}>
          <Card className={classes.rootInside}>
            <CardActionArea>
              <CardMedia
                className={classes.image}
                component="img"
                alt="Producto"
                image="https://pluspng.com/img-png/my-little-pony-png-download-my-little-pony-png-images-transparent-gallery-advertisement-1834.png"
                title="PonyProducto"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" >
                  Perfume pony
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  500 ponydolars
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
            
          </Grid>
      </Grid>
    </div>
      </Grid>
    </React.Fragment>
  );
}

function CreatePostForm(){
  const classes = useStyles();

}