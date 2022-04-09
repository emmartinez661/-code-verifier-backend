//  1. primero vamos a importar las dependencias que vamos a necesitar para para crear el backend 

const express = require('express');
const dotenv = require('dotenv');

//  2. Configuracion del archivo .env
//  creamos el archivo .env en la raiz
dotenv.config();

//  3. creamos la variable app que lo que hace es la ejecucion de una instancia express que luego se le van añadir el tipo de mensaje que van a recibir, bien sea json , si se va a habilitar el CORS, si se le va a poner algun tipo de autenticacion 
const app = express();
//   4. crea la variable que contiene el puerto 8000 creado desdee el archivo .env a traves del siguiente codigo, ademas le añadimos el or en caso de que no encuentre la variable la use directamente 
const port = process.env.PORT || 8000;

// 5. Define the first route of the app aqui vamos a crear la primera ruta la cual solo nos va a enviar una respuesta, por ahora no esta usando el request

app.get('/', (req, res) => {
//  Envia un saludo
  res.send('welcome to API RESTFUL: Express + TS + Swagget + mongoose')
})

// 6. xecute app and listen request   to PORT  añadimos una funcion que va a escuchar y a ejecutar el servidor de backend para saber si esta activo 
app.listen(port, () => {
  console.log(`Express Server: Runnning at: http://localhost:${port}`)
})
