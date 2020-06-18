import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from '@material-ui/lab/Alert'
import _ from "lodash";
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { searchUserOrders, resetSearchUserOrders } from "../actions/searchUserOrders";



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  btnColorGreen: {
    color: "#32CD32",

    "&:hover": {
      background: "#3CB371",
      color: "#FFFFFF"
    },
  },
  btnDelete: {
    color: "#FF0000",

    "&:hover": {
      background: "#8B0000",
      color: "#FFFFFF",
    }
  },
  imgWidth: {
    width: 200,

  },
});



export default function SpanningTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading = useSelector((state) => _.get(state, "searchOrders.loading"));
  const results = useSelector((state) => _.get(state, "searchOrders.results"));
  const error = useSelector((state) => _.get(state, "searchOrders.error"));

  console.log(props.detalle);

  var validacion = null;
  useEffect(() => {
    if (results && validacion == null) {
      dispatch(resetSearchUserOrders());
    }
    if (!loading && !results && !error && !validacion) {
      dispatch(searchUserOrders(props.detalle));
      validacion = 'dfjdsfdfkhdfkjdhfkshdfkj';
    }
  });

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  const resetearFuncion = () => {
    if (results) {
      validacion = true;
      dispatch(resetSearchUserOrders());
    }
  }

  const renderPublicaciones = () => {
    if (results) {
      validacion = true;
      if (results.idProducto === props.detalle.idProducto) {
        const aux = results;

        return (
          <TableRow key={props}>
            <TableCell>
              <img src={aux.imProduct} className={classes.imgWidth} />
            </TableCell>
            <TableCell align="center">{aux.imName}</TableCell>
            <TableCell align="right">{aux.precioCompra}</TableCell>
            <TableCell align="right">{aux.cantidad}</TableCell>
            <TableCell align="right">{ccyFormat(aux.subtotal)}</TableCell>
          </TableRow>
        );

      } else if (error) {
        return (
          <Alert severity="error">
            Oops, something terrible has happened! :(
          </Alert>
        );

      }
    } else if (loading) {
      return <CircularProgress size={90} color="primary" />;
    }



    return <CircularProgress size={90} color="primary" />
  };

  return renderPublicaciones();
}