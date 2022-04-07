import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv'; 

//Configuracion del .env
dotenv.config();

//Creamos el Express APP
const app: Express = express();
const port: String | number  = process.env.PORT || 8000;

//definimos la ruta de la app
app.get('/', (req: Request, res: Response) => {
    //send hola mundo
    res.send('Welcome to my API Restful: Express + nodemon + jest + TS + Swagger + Mongoose ')
})

app.get('/hello', (req: Request, res: Response) => {
    //send hola mundo
    res.send('Page Hello')
})

app.listen(port, () => {
    console.log(`Express Server: Running en http://localhost:${port}`)
})

