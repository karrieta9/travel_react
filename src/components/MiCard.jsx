import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import PropTypes from "prop-types";


const MiCard = ({nombre, region, img, onclick}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={onclick}>
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt={nombre}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nombre}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {region}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


MiCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  region: PropTypes.string,
};

MiCard.defaultProps = {
  nombre: "N/A",
  region: "N/A",
};

export default MiCard