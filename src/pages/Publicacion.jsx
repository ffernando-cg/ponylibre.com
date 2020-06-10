import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 25,
    marginLeft: "1rem",
    marginRight: "1rem",
    alignItems: 'center'
  },
  image : {
    height:250
  },
  underCardColor : {
    backgroundColor: '#CDF1AF',
  },
  underCardColor2 : {
    backgroundColor: '#FFD3D4',
  },
  underCardButton: {
    backgroundColor: '#fffff',
  }
});

export default function ImgMediaCard(params) {
  const classes = useStyles();

  //return this.products.map(p => (
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.image}
          component="img"
          alt="Producto"
          image="https://pluspng.com/img-png/my-little-pony-png-download-my-little-pony-png-images-transparent-gallery-advertisement-1834.png"
          title="PonyProducto"
        />
        <CardContent className={classes.underCardColor}>
          <Typography gutterBottom variant="h5" component="h2" >
            Perfume pony
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            500 ponydolars
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.underCardColor2}>
        <Button size="small" color="secondary" className={classes.underCardButton}>
          Comprar
        </Button>
      </CardActions>
    </Card>
    
  );
  // ));
}