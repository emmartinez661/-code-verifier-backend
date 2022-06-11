import express, {Request, Response} from 'express';
import { AuthController,  } from '../controller/AuthController';
import { LogInfo } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';

//middleware 
import { verifyToken } from '../middlewares/verityToken.middlewares';

//body parser (read JSON from  body in Requests )
import bodyParser from 'body-parser';

//middleware to read JSON in body
let jsonParser = bodyParser.json();

//BCRYPT for password
import bcrypt from 'bcrypt' //cifrar y descifrar contraseñas 
import { IAuth } from '../domain/interfaces/IAuth.interfaces';

//Router from express
let authRouter = express.Router();


authRouter.route('/register')
  .post (jsonParser ,async (req: Request, res: Response) =>{

    let { name, email, password, age} = req?.body;
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
    

    }   else {
      //send to the client the response
      return res.status(400).send({
        message: '[ERROR User Data missing]: No user can be registered'
      })
    }
    
  })

  authRouter.route('/login')
  .post (jsonParser, async (req: Request, res: Response) =>{

    let {  email, password} = req?.body;
    
    
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
    

    } else {
      //send to the client the response
      return res.status(400).send({
        message: '[ERROR User Data missing]: No user can be registered'
      });
    }
   
  });

  //Route Protected by VERIFY TOKEN Middleware 
  authRouter.route('/me')
  .get(verifyToken, async (req: Request, res: Response ) =>{

    // Obtain the ID of user to check it's data 
    let id: any = req?.query.id;

    if(id){
      //Controller: Auth Controller
      const controller : AuthController = new AuthController();

      //Obtain respnse from Controller
      let response: any = await controller.userData(id)

      //if user is authorised:
      return res.status(200).send(response)
      
    }else {
      return res.status(401).send({
        message: 'Yout are not authorized to perform this action '
      })
    }

  })

  export default authRouter;