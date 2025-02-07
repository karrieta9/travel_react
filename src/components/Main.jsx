import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Pagination, Box } from '@mui/material';
import { consulta } from "./../global/general";
import MiCard from "./MiCard";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState(1);
  const elementosPorPagina = 8

  useEffect(() => {
    const fetchData = async () => {
      let data = await obtenerData()
      if (data) {
        setData(data.sort((a, b) => a.name.common.localeCompare(b.name.common)))
      }
      setCargando(false)
    };

    fetchData();

    return () => {
      console.log("dismount");
    };
  }, []);


  const indiceInicio = (pagina - 1) * elementosPorPagina;
  const indiceFin = indiceInicio + elementosPorPagina;
  const dataPaginada = data.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(data.length / elementosPorPagina);


  const obtenerData = () => {
    return new Promise(resolve => {
      consulta(`https://restcountries.com/v3.1/all`, null, 'get', (error, estado, resp) => {
        resolve(estado === 200 && !error ? resp : null);
      })
    })
  }


  const handleClick = (id) => {
    navigate(`/country/${id}`);
  };

  return <div style={{
    maxWidth: "1280px",
    margin: "auto",
    padding: "2rem",
    textAlign: "center"
  }}>
    {cargando ?
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          // width: "100vw"
        }}
      >
        <CircularProgress sx={{ color: "#eba015" }} />
      </Box>
      :
      <>
        <h1>¡Pick your Country!</h1>

        <Grid container spacing={3}>
          {dataPaginada.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <MiCard
                onclick={() => handleClick(item.ccn3)}
                nombre={item.name.common}
                region={item.region}
                img={item.flags.png}
              />
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={totalPaginas}
          page={pagina}
          onChange={(event, value) => setPagina(value)}
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              color: "white",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#eba015 !important",
              color: "white !important",
            },
            "& .MuiPaginationItem-root.Mui-selected:hover": {
              backgroundColor: "#946611 !important",
            }
          }}
        />
      </>
    }
  </div>
}

export default Main;
