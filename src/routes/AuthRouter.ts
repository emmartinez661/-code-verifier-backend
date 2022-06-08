import express, {Request, Response} from 'express';
import { AuthController,  } from '../controller/AuthController';
import { LogInfo } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';


//BCRYPT for password
import bcrypt from 'bcrypt'
import { IAuth } from '../domain/interfaces/IAuth.interfaces';

//Router from express
let authRouter = express.Router();


authRouter.route('/auth/register')
  .post (async (req: Request, res: Response) =>{

    let { name, email, password, age} = req.body;
    let hashedPassword = '';
    
    if(name && password && email && age){

      //obtain the password in request and cypher 
      hashedPassword =bcrypt.hashSync(password, 8)

      let newUser : IUser = {
        name : name,
        email : email, 
        password: hashedPassword,
        age :age 
      }

      //Controller Instance to execute method
      const controller: AuthController = new AuthController();     
      //obtain response 
      const response : any = await controller.registerUser(newUser)
      //  send to the client the response
      return res.status(200).send(response);
    

    }   
    
  })

  authRouter.route('/auth/login')
  .post (async (req: Request, res: Response) =>{

    let {  email, password} = req.body;
    
    
    if( email && password){

      //Controller Instance to execute method
      const controller: AuthController = new AuthController();  
      
      
      let auth : IAuth = {
        email: email, 
        password: password 
      }

      //obtain response 
      const response : any = await controller.loginUser(auth)
      //  send to the client the response with includes the JWT to authorize requests 
      return res.status(200).send(response);
    

    }
   
  })

  export default authRouter;