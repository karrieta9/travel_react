export const consulta = (url, data = null, method = null, callback, authorization = true) => {
  let parametros = {
      headers: {
          'Content-Type': 'application/json'
      }
  }

  if (method) parametros.method = method;
  if (data) parametros.body = JSON.stringify(data);

  fetch(url, parametros)
      .then(async response => {
          const estado = response.status;
          if (estado === 401) {
              window.location.href = "/sin_sesion";
          } else {
              const resp = await response.json();
              callback(null, estado, resp)
          }
      }).catch(error => callback(error));
}