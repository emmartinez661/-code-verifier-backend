import express, {Request, Response} from 'express';
import { UserController,  } from '../controller/UsersController';
import { LogInfo } from '../utils/logger';

// Router from express
let usersRouter = express.Router();

// http://localhost:8000/api/users/
//              O
// http://localhost:8000/api/users/?id=6274894ce14de90e7c57302a

usersRouter.route('/')
  // GET
  .get(async (req: Request, res: Response) => {
    //   Obtain Query Params (ID)
    let id: any = req?.query?.id;  
     //  dara un mensaje por la consola: se ha solicitado una peticion a esta ruta con este valor
     LogInfo(`Query Param: ${id}`);
    //  Controller instance to execute method
    const controller: UserController = new UserController();
    //  obtain response
    const response: any = await controller.getUsers(id);
    //  send to the client the response
    return res.send(response);
  })

  .delete(async(req:Request, res: Response) =>{
    //   Obtain Query Params (ID)
    let id: any = req?.query?.id;  
     //  dara un mensaje por la consola: se ha solicitado una peticion a esta ruta con este valor
    LogInfo(`Query Param: ${id}`);
    //  Controller instance to execute method
    const controller: UserController = new UserController();
    //  obtain response
    const response: any = await controller.deleteUser(id);
    //  send to the client the response
    return res.send(response);
  })

  //POST
  .post(async(req:Request, res: Response) =>{
    
      let name: any = req?.query?.name;
      let email: any = req?.query?.email;    
      let age: any = req?.query?.age;  

     //  Controller instance to execute method
     const controller: UserController = new UserController();

     //datos de prueba
     let user ={
       name: name || 'default',
       email: email || 'default email',
       age: age || 18
     }

     //  obtain response
     const response: any = await controller.createUser(user);
     //  send to the client the response
     return res.send(response);
  })

  .put(async(req:Request, res: Response) => {
      //   Obtain Query Params (ID)
      let id: any = req?.query?.id; 
      let name: any = req?.query?.name;
      let email: any = req?.query?.email;    
      let age: any = req?.query?.age;  
        //  dara un mensaje por la consola: se ha solicitado una peticion a esta ruta con este valor
    LogInfo(`Query Param: ${id}, ${name}, ${age}, ${email}`); 

     //  Controller instance to execute method
     const controller: UserController = new UserController();

     //datos de prueba
     let user ={
      name: name ,
      email: email ,
      age: age 
    }

      //  obtain response
      const response: any = await controller.updateUSer(id, user);
      //  send to the client the response
     return res.send(response);
  })

// Export Hello Router
export default usersRouter;
