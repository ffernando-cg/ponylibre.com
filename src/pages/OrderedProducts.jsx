import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import OrdererRow from './OrdererRow'

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
  const [order, setOrder] = useState(props.order);



  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  const invoiceTaxes = TAX_RATE * order.total;
  const invoiceTotal = invoiceTaxes + order.total;

  const renderRowsOrder = () => {
    console.log(order.detalle)
    return (order.detalle.map((p, index) => (
      <OrdererRow Key={index} id={index} detalle={p} />
    )));
  }

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
          {renderRowsOrder()}

          <TableRow>
            <TableCell rowSpan={4} />
            <TableCell rowSpan={4} />
            <TableCell rowSpan={4} />
            <TableCell colSpan={2}>SUBTOTAL</TableCell>
            <TableCell align="right">{ccyFormat(order.total)}</TableCell>
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