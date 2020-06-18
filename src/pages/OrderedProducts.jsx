import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from '@material-ui/lab/Alert'
import _ from "lodash";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { searchUserOrders } from "../actions/searchUserOrders";

const TAX_RATE = 0.16;

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
  }
});



export default function SpanningTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading = useSelector((state) => _.get(state, "searchOrders.loading"));
  const results = useSelector((state) => _.get(state, "searchOrders.results"));
  const error = useSelector((state) => _.get(state, "searchOrders.error"));

  const arreglo = [];
  useEffect(() => {
    if (!loading && !results && !error) {
      props.order.detalle.forEach(element => {
        dispatch(searchUserOrders(element));
        if (results) {
          arreglo.push(createRow(results.imProduct, results.imName, results.cantidad, results.precioCompra));
        }
      });

    }
  });


  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unit) { //----------- CALCULO RAPIDO DE ENTRE LA CANTIDAD POR LAS UNIDADES
    return qty * unit;
  }

  function createRow(img, desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { img, desc, qty, unit, price };
  }

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }


  const rows = arreglo;

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const renderPublicaciones = () => {
    if (!rows) {
      debugger
      return (rows.map((row) => (
        <TableRow key={row.desc}>
          <TableCell>
            <img src={row.img} />
          </TableCell>
          <TableCell align="center">{row.desc}</TableCell>
          <TableCell align="right">{row.qty}</TableCell>
          <TableCell align="right">{row.unit}</TableCell>
          <TableCell align="right">{ccyFormat(row.price)}</TableCell>
          <TableCell align="right">
            <Button variant="outlined" color="inherit" className={classes.btnDelete} size="small"> {//------------ BOTON PARA QUITAR UN PRODUCTO DE UNA FILA POR LA LLAVE QUE SE DECLARA ARRIBA
            }<DeleteOutlinedIcon fontSize="small" />
            </Button>
          </TableCell>
        </TableRow>
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
    return <div>Programador de Mierda</div>
  };


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Nombre del producto</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio unitario</TableCell>
            <TableCell align="right">Total por este producto</TableCell>
            <TableCell align="right">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderPublicaciones()}

          <TableRow>
            <TableCell rowSpan={4} />
            <TableCell rowSpan={4} />
            <TableCell rowSpan={4} />
            <TableCell colSpan={2}>SUBTOTAL</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>IVA</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>TOTAL</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Button variant="outlined" size="large" className={classes.btnColorGreen}>
                <CheckCircleOutlineIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}