import React, { useState, useEffect } from 'react'
import { Grid, CircularProgress, List, ListItem, ListItemText, ListItemIcon, IconButton, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { consulta } from "./../global/general";
import DomainIcon from '@mui/icons-material/Domain';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import Groups2Icon from '@mui/icons-material/Groups2';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Country = () => {
  const { id_param } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);


  useEffect(() => {
    if (!id_param) {
      navigate("/");
    }

    const fetchData = async () => {
      let data = await obtenerData(id_param)
      if (data) {
        setData(data)
      }
      setCargando(false)
    };

    fetchData();


  }, [id_param, navigate]);


  const obtenerData = (id) => {
    return new Promise(resolve => {
      consulta(`https://restcountries.com/v3.1/alpha/${id}`, null, 'get', (error, estado, resp) => {
        resolve(estado === 200 && !error ? resp : null);
      })
    })
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      { cargando ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw"
          }}
        >
          <CircularProgress sx={{ color: "#eba015" }} />
        </Box>
      ) : (
        <>
          <Grid container style={{ height: "100%", width: "100%" }}>
            <Grid
              item
              xs={4}
              sx={{
                backgroundImage: `url('${data[0].flags.svg}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <IconButton onClick={() => navigate("/")} size='large' sx={{
                backgroundColor: "#33302b",
                color: "#eba015",
                boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.3)",
                transition: "0.3s ease-in-out",
                "&:hover": {
                  background: "#000",
                  boxShadow: "4px 6px 12px rgba(0, 0, 0, 0.4)"
                },
                "&:active": {
                  background: "red",
                  boxShadow: "none"
                },
                margin: "20px"
              }}>
                <ArrowBackIosNewIcon />
              </IconButton>
            </Grid>

            <Grid item xs={8} sx={{ padding: "30px 70px" }}>
              <h1>{data[0].name.common}{data[0].cioc ? ` - ${data[0].cioc}` : ''}</h1>
              <p>{data[0].name.official}</p>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <DomainIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={data[0].capital ? data[0].capital[0] : ''}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SouthAmericaIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={data[0].region}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TravelExploreIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${data[0].area ? Number(data[0].area).toLocaleString("es-ES") : ''} mts2`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Groups2Icon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={data[0].population ? Number(data[0].population).toLocaleString("es-ES") : ''}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LanguageIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={Object.values(data[0].languages).join(", ")}
                  />
                </ListItem>
              </List>
              {/* <h1>{data[0].maps.googleMaps}</h1> */}
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );

}

export default Country
