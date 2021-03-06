import express, {Request, Response} from 'express';
import { UserController,  } from '../controller/UsersController';
import { LogInfo } from '../utils/logger';


//middleware 
import { verifyToken } from '../middlewares/verityToken.middlewares';

// Router from express
let usersRouter = express.Router();

// http://localhost:8000/api/users/
//              O
// http://localhost:8000/api/users/?id=6274894ce14de90e7c57302a

usersRouter.route('/')
  // GET
  .get(verifyToken,async (req: Request, res: Response) => {
    //   Obtain Query Params (ID)
    let id: any = req?.query?.id;  

    //Pagination
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;

     //  dara un mensaje por la consola: se ha solicitado una peticion a esta ruta con este valor
     LogInfo(`Query Param: ${id}`);
    //  Controller instance to execute method
    const controller: UserController = new UserController();
    //  obtain response
    const response: any = await controller.getUsers(page, limit, id);
    //  send to the client the response
    return res.status(200).send(response);
  })

  .delete(verifyToken, async(req:Request, res: Response) =>{
    //   Obtain Query Params (ID)
    let id: any = req?.query?.id;  
     //  dara un mensaje por la consola: se ha solicitado una peticion a esta ruta con este valor
    LogInfo(`Query Param: ${id}`);
    //  Controller instance to execute method
    const controller: UserController = new UserController();
    //  obtain response
    const response: any = await controller.deleteUser(id);
    //  send to the client the response
    return res.status(200).send(response);
  })



  .put(verifyToken,async(req:Request, res: Response) => {
      //   Obtain Query Params (ID)
      let id:     any = req?.query?.id; 
      let name:   any = req?.query?.name;
      let email:  any = req?.query?.email;    
      let age:    any = req?.query?.age;  
        //  dara un mensaje por la consola: se ha solicitado una peticion a esta ruta con este valor
    LogInfo(`Query Param: ${id}, ${name}, ${age}, ${email}`); 

     //  Controller instance to execute method
     const controller: UserController = new UserController();

     //datos de prueba
     let user ={
      name:   name ,
      email:  email ,
      age:    age 
    }
      //  obtain response
      const response: any = await controller.updateUSer(id, user);
      //  send to the client the response
     return res.status(200).send(response);
  })


  usersRouter.route('/katas')
  .get(verifyToken,async (req: Request, res: Response) =>{
    //obtain a query param ID
    let id: any = req?.query?.id;

    //Pagination
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;

    //  Controller instance to execute method
    const controller: UserController = new UserController();
    //  obtain response
    const response: any = await controller.getKatas(page, limit, id);
    //  send to the client the response
    return res.status(200).send(response);
  })
  
// Export Hello Router
export default usersRouter;

