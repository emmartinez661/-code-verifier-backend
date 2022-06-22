//import { updateKatasByValoration } from '@/domain/orm/Katas.orm';
/* import express, { Request, Response} from 'express';
import { KatasController } from '../controller/KatasController';
import { LogInfo } from '../utils/logger'; */

//Router from express
/* let katasRouter = express.Router(); */

//body parser (read JSON from body in Requests)
/* import bodyParser, { json } from 'body-parser';
 */
//middleware to read JSON in body
/* let jsonParser = bodyParser.json();

import {verifyToken} from '../middlewares/verityToken.middlewares'
import { IKatas } from '../domain/interfaces/IKatas.interface'; */


//http:localhost:8000/api/katas/
/* katasRouter.route('/') */
//Get
/* .get(jsonParser,verifyToken, async (req: Request, res: Response) => {

    // Obtain query params (id)
    let id:any = req?.query?.id;

    

    //pagination
    let page: any = req?.query?.page|| 1;
    let limit: any = req?.query?.limit || 10;
    //dara un mensaje por consola
    LogInfo(`Query param ${id}`);

    //Controller instance to execute method
    const controller: KatasController = new KatasController();
    //obtain response ID
    const response: any = await controller.getKatas(page, limit,id);
    // send to the client the response
    return res.status(200).send(response);
}) */

//POST
/* .post(jsonParser,verifyToken, async(req:Request, res: Response) =>{

     let { name, description, level, user, valoration, chances, } = req?.body;  


  if( name && description && level  && user && valoration && chances){

     //Controller instance to execute method
  const controller: KatasController = new KatasController(); 

      //datos de prueba
  let newkata = {
      name:        name,
      description: description,
      level:        level,
      user:         user,
      date:         Date.now(),
      valoration:   valoration,
      chances:      chances,
            
  }
 

  //obtain respnse
  const response: any =await controller.createKata(newkata);
  //send to the client the respnse
  return res.status(200).send(response);

  }else {
      return res.status(400).send({
          message: `[ERROR Kata Data missing]: Kata can not be registered `
      })
  }
  
})

 */

/* .delete(verifyToken, async(req:Request, res:Response) => {
    // Obtain query params (id)
    let id:any = req?.query?.id;
    //dara un mensaje por consola
    LogInfo(`Query param ${id}`);
    //Controller instance to execute Method
    const controller: KatasController = new KatasController();
    //obtain response
    const response: any = await controller.deleteKata(id);
    //send to the client the response
    return res.status(204).send(response);
})
 */


/* .put(jsonParser,verifyToken,async(req: Request, res:Response) =>{
    //obtain query params (ID)
    let id:             any = req?.query?.id;

    let { name, description, level, user , valoration, chances} = req?.body;

  
    
    LogInfo(`Query param: ${id}, ${name}, ${description}, ${level}, ${user}, ${valoration}, ${chances}`);

    //controller instance to execute method
    const controller: KatasController = new KatasController();

    //datos de prueba 
     let kata = {
        name:        name,
        description: description,
        level:        level,
        user:         user,
        date:         Date.now(),
        valoration:   valoration,
        chances:      chances
    }

    //obtain response
    const response: any = await controller.updateKata(id, kata);
    //send to the client the response
    return res.status(200).send(response);
}) */


/* katasRouter.route('/level',) // de esta forma enviamos a mas niveles las consultas filtradas 
.get(jsonParser,verifyToken,async(req: Request, res:Response) =>{
    //obtain query params (level)
    
    let { level } = req?.body
    //dara un mensaje por consola
    LogInfo(`Query param ${level}`);

    //Controller instance to execute method
  const controller: KatasController = new KatasController();
  //obtain response 
  const response: any = await controller.filterKatasByLevel(level);
  // send to the client the response
  return res.status(200).send(response);

})
 */
/* katasRouter.route('/r')
.get(jsonParser,verifyToken,async(req: Request, res:Response) =>{
    //Controller instance to execute method
  const controller: KatasController = new KatasController();

  const response:any = await controller.getKatasRecently();
  //send to the client the response
  return res.status(200).send(response);
} ) */

/* katasRouter.route('/valorations')
.get(jsonParser,verifyToken,async(req: Request, res: Response)=>
{
    //controller instance to execute method
    const controller: KatasController = new KatasController();

    const response: any = await controller.getKatasValorated();
    //send to the client the respnse
    return res.status(200).send(response);
} ) */


/* .put(jsonParser,verifyToken,async (req: Request, res: Response) => {
    //let id: any = req.query.id;
    
    let { name, userID, vote} = req?.body;

    LogInfo(`Query Param: ${name}, ${vote}`);

    const controller: KatasController = new KatasController();


    const response: any = await controller.updateKatasValoration(name, vote, userID);

    return res.status(200).send(response);

}) */

/* katasRouter.route('/chances')
.get(jsonParser, verifyToken,async(req: Request, res: Response)=>
{
    //controller instance to execute method
    const controller: KatasController = new KatasController();

    const response: any = await controller.getKatasTried();
    //send to the client the respnse
    return res.status(200).send(response);
} )
 */




//export Katas Router
/* export default katasRouter; */