import express, {Request, Response} from 'express';
import { GoodByeController } from '../controller/GoodByeController';
import { LogInfo } from '../utils/logger';

//router from express
let goodbyeRouter = express.Router();

//http:localhost:8000/api/goodbye/
goodbyeRouter.route('/')
// GET
.get (async (req: Request, res: Response) => {
    // Obtain query params
    let name: any = req?.query?.name;
    //  dara un mensaje por la consola: se ha solicitado una peticion a esta ruta con este valor
    LogInfo(`Query Param: ${name}`);
      //  Controller instance to execute method
      const controller: GoodByeController = new GoodByeController();
      //  obtain response
      const response = await controller.getMessage(name);
      //  send to the client the response
      return res.send(response);
})

//export goodbye router
export default goodbyeRouter;