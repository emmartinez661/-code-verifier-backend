/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response} from 'express';
import helloRouter from './HelloRouter';
import goodbyeRouter from './GoodByeRouter';
import { LogInfo } from '../utils/logger';
import usersRouter from './UserRouter';
import katasRouter from './KatasRouter'
import authRouter from './AuthRouter'

// Server Instance
let server = express();

// router instance
let rootRouter = express.Router();

//Activate for request to http:localhost:8000/api

// GET  http:localhost:8000/api/
rootRouter.get('/', (req: Request, res:Response) =>{
        LogInfo('GET: http:localhost:8000/api/')
        //Send Hello World 
        res.send('Welcome to my API restfull')
});



//redirection to routers and controllers
server.use('/', rootRouter);//http:localhost:8000/api/
server.use('/hello', helloRouter); //http:localhost:8000/api/hello/
server.use('/goodbye', goodbyeRouter);
server.use('/users',usersRouter)//http:localhost:8000/api/users/ -->User Router
server.use('/katas',katasRouter)//http:localhost:8000/api/katas/ -->Katas Router
server.use('/auth', authRouter)//http:localhost:8000/api/auth/ -->Auth Router

//Add more Routes to the app


export default server;
