import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Grid, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { createOrderDetail, resetCreateOrderDetail } from "../actions/createOrderDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: 25,
    marginLeft: "1rem",
    marginRight: "1rem",
    alignItems: 'center'
  },
  image: {
    height: 250
  },
  underCardColor: {
    backgroundColor: '#CDF1AF',
  },
  underCardColor2: {
    backgroundColor: '#FFD3D4',
  },
  underCardButton: {
    backgroundColor: '#fffff',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #87DCC0',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10, 15, 10),
  },
  image2: {
    height: 450
  },
  btnRight: {
    color: '#696969',
    backgroundColor: '#F0F0F0',
    alignItems: 'right',
    marginLeft: 280
  },
  divisor: {
    marginTop: 20,
    marginBottom: 20
  },
  btnColorGreen: {
    color: "#3CB371",

    "&:hover": {
      background: "#3CB371",
      color: "#FFFFFF"
    },
  },
}));

export default function ImgMediaCard(props) {
  const {
    id,
    img,
    name,
    price,
    description,
    history
  } = props;

  const { idOrden, usuario } = props;

  const classes = useStyles();

  const dispatch = useDispatch();
  const loading = useSelector((state) => _.get(state, "createOrderDetail.loading"));
  const results = useSelector((state) => _.get(state, "createOrderDetail.results"));
  const error = useSelector((state) => _.get(state, "createOrderDetail.error"));


  const [open, setOpen] = React.useState(false);

  const renderPublicaciones = () => {
    if (results) {
      console.log(results);
      dispatch(resetCreateOrderDetail());
    } else if (error) {
      return 
    }
    return ;
  };

  function _handleLogin(event) {

    const obj = {
      userEmail: usuario,
      id: id,
      idOrder: idOrden
    }

    if (!loading && !results && !error) {
      dispatch(createOrderDetail(obj));
    }

    renderPublicaciones();
  }


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //return this.products.map(p => (
  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.image}
            component="img"
            alt="Producto"
            image={img}
            title="PonyProducto"
            onClick={handleOpen}
          />
          <CardContent className={classes.underCardColor}>
            <Typography gutterBottom variant="h5" component="h2" >
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {price} ponydolars
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item md={5}>
                <img src={img} className={classes.image2} />
              </Grid>
              <Grid item md={3} />
              <Grid item md={4}>
                <Button className={classes.btnRight} onClick={handleClose}>
                  <CloseIcon />
                </Button>
                <Typography gutterBottom variant="h3" component="h2" >
                  {name}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="h6">
                  {price} ponydolars
            </Typography>
                <Typography variant="h6" color="textSecondary" component="h6">
                  {description}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="h6">
                  Texto por si le quieren añadir
            </Typography>
                <Divider className={classes.divisor} />
                <Button variant="outlined" size="large" className={classes.btnColorGreen} onClick={() => _handleLogin()}>
                  COMPRAR
              </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
  // ));
}