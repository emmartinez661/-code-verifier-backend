import express, { Response, Request} from 'express';

// Swagger
import swaggerUi from 'swagger-ui-express';

//Enviroment variable
import dotenv from 'dotenv';

//Security
import cors from 'cors';
import helmet from 'helmet'; 

//TODO https

//Root Router
import rootRouter from '../routes';
import mongoose from 'mongoose';

//Configuration the .env File
dotenv.config();

// * Create Express app
const server = express();
const port: string | number = process.env.PORT || 8000;

// * Swagger Config and route
//https:localhost:8000/docs
server.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
            explorer: true
        }
    })
);

//Define Server to use "/api" and use rootRouter from 'index.ts' in routes
//desde este punto,tendremos https://localhost:8000/api...
server.use(
    '/api', 
    rootRouter)

//static server 
server.use(express.static("public"));


// TODO mongoose conection
mongoose.connect('mongodb://localhost:27017/codeverification')


// Security Connection
server.use(helmet());
server.use(cors());

//Content Type config
server.use(express.urlencoded({ extended: true, limit: '50mb'}));
server.use(express.json({limit: '50mb'}));

// Redirection Config
//http:localhost:8000/ >> http:localhost:8000/api
server.get('/', (req: Request, res: Response) =>{
    res.redirect('/api');
});

export default server;