import express, {Request, Response} from 'express';
import { HelloController } from '../controller/HelloController';
import { LogInfo } from '../utils/logger';

// Router from express
let helloRouter = express.Router();

// http://localhost:8000/api/hello/
helloRouter.route('/')
  // GET
  .get(async (req: Request, res: Response) => {
  //   Obtain Query Params
    let name: any = req?.query?.name;
    //  dara un mensaje por la consola: se ha solicitado una peticion a esta ruta con este valor
    LogInfo(`Query Param: ${name}`);
    //  Controller instance to execute method
    const controller: HelloController = new HelloController();
    //  obtain response
    const response = await controller.getMessage(name);
    //  send to the client the response
    return res.send(response);
  })

// Export Hello Router
export default helloRouter;
