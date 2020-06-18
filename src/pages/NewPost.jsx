import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";
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
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import Alert from "@material-ui/lab/Alert";
import { createProduct, resetCreateProduct } from "../actions/createProduct";
import { resetProductSearch } from "../actions/searchProducts";
import S3FileUpload from 'react-s3';

//Optional Import

const config = {
  bucketName: 'ponylibre',
  region: 'us-west-1',
  accessKeyId: 'AKIAIIGRIIBL42XGQVPQ',
  secretAccessKey: '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',
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  imageTitle: {
    height: 50
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
    color: "#666666",

    "&:hover": {
      background: "#404040",
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
  rootInside: {
    maxWidth: "75vh",
    marginTop: 25,
    marginRight: "35vh"
  },
  input: {
    display: 'none',
  },
  spacedHeight: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  spacedHeightBlank: {
    marginTop: "5vh"
  },
  buttonAccept: {
    background: "#008000",
    color: "#FFFFFF",

    "&:hover": {
      background: "#496442",
      color: "#FFFFFF"
    },
  },
}));

export default function NewProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => _.get(state, "createProduct.loading"));
  const results = useSelector((state) => _.get(state, "createProduct.results"));
  const error = useSelector((state) => _.get(state, "createProduct.error"));


  const [product, setProduct] = useState({
    name: '',
    img: 'https://pluspng.com/img-png/my-little-pony-png-download-my-little-pony-png-images-transparent-gallery-advertisement-1834.png',
    description: '',
    price: ''
  });

  const createProductAction = () => {

    if (results) {
      console.log(results);
      dispatch(resetProductSearch());
      dispatch(resetCreateProduct());
      history.push("/mainpage");
    } else if (error) {
      return (
        <Alert severity="error">
          Oops, something terrible has happened! :(
        </Alert>
      );
    }
    dispatch(resetProductSearch());
    dispatch(resetCreateProduct());
    history.push("/mainpage");
  };

  function _handleUploadFile(event) {
    console.log(event.target.files[0])

    S3FileUpload
      .uploadFile(event.target.files[0], config)
      .then(data => {
        _handleImgChange(data.location);
      })
      .catch(err => console.error(err))
  }

  function _handleSubmit(event) {
    if (!loading && !results && !error) {
      dispatch(createProduct(product));
    }
    createProductAction();
  }

  function _handleNameChange(event) {
    setProduct({
      name: event.target.value,
      img: product.img,
      description: product.description,
      price: product.price
    });
    console.log(product);
  }

  function _handleImgChange(url) {
    setProduct({
      name: product.name,
      img: url,
      description: product.description,
      price: product.price
    });
  }

  function _handleDescriptionChange(event) {
    setProduct({
      name: product.name,
      img: product.img,
      description: event.target.value,
      price: product.price
    });
  }

  function _handlePriceChange(event) {
    setProduct({
      name: product.name,
      img: product.img,
      description: product.description,
      price: event.target.value,
    });
  }

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
                onChange={(e => _handleUploadFile(e))}
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
                onChange={(e) => _handleNameChange(e)}
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
                onChange={(e) => _handleDescriptionChange(e)}
              />

              <Divider className={classes.spacedHeight} />

              <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                <FilledInput
                  id="filled-adornment-amount"
                  value={product.price}
                  onChange={(e) => _handlePriceChange(e)}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormControl>

              <Divider className={classes.spacedHeight} />
              <Button variant="contained" color="inherit" className={classes.buttonAccept} fullWidth size="large" onClick={() => _handleSubmit()}>
                Guardar y publicar
            </Button>
            </Grid>

            <Grid item sm={0} md={1}></Grid>
            <Grid item md={7}>
              <Card className={classes.rootInside}>
                <CardActionArea>
                  <CardMedia
                    className={classes.image}
                    component="img"
                    alt="Producto"
                    id="ProductoImagen"
                    image={product.img}
                    title="PonyProducto"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" >
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {product.description}
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