import express, {Request, Response} from 'express';
import { KatasController,  } from '../controller/KatasController';
import { LogInfo } from '../utils/logger';

//Body parser to read BODY from requests
import bodyParser from 'body-parser';

let jsonParser = bodyParser.json();

//middleware 
import { verifyToken } from '../middlewares/verityToken.middlewares';
import { IKata, KataLevel } from '../domain/interfaces/IKata.interface';

// Router from express
let katasRouter = express.Router();

// http://localhost:8000/api/users/
//              O
// http://localhost:8000/api/users/?id=6274894ce14de90e7c57302a

katasRouter.route('/')
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
    const controller: KatasController = new KatasController();
    //  obtain response
    const response: any = await controller.getKatas(page, limit, id);
    //  send to the client the response
    return res.status(200).send(response);
  })

  

  .delete(verifyToken, async(req:Request, res: Response) =>{
    //   Obtain Query Params (ID)
    let id: any = req?.query?.id;  
     //  dara un mensaje por la consola: se ha solicitado una peticion a esta ruta con este valor
    LogInfo(`Query Param: ${id}`);
    //  Controller instance to execute method
    const controller: KatasController = new KatasController();
    //  obtain response
    const response: any = await controller.deleteKata(id);
    //  send to the client the response
    return res.status(200).send(response);
  })



  .put(jsonParser,verifyToken,async(req:Request, res: Response) => {
      //   Obtain Query Params (ID)
      let id:     any = req?.query.id; 
      let userID: any = req?.query.userID;
      
      let name:         string   = req?.body?.name; //campo obligatorio x 
      let description:  string   = req?.body?.description || '';
      let level:       KataLevel = req?.body?.level ||  KataLevel.BASIC;
      let intents:     number    = req?.body?.intents || 0;
      let stars:        number   = req?.body?.stars || 0;
      let creator:      string   = req?.body?.creator; //al no poner opcion or este campo sera obligatorio
      let solution:     string   = req?.body?.solution|| '';
      //let participants: string []  = req?.body?.participants || [];
        
      if(name && description && level &&   solution && userID){

        //  Controller instance to execute method
     const controller: KatasController = new KatasController();
     //datos de prueba
     let kata:IKata ={
        name: name,
        description: description,
        level: level,
        intents: intents,
        stars: stars,
        creator: creator,
        solution: { 
          solution: solution,
          uSolutions:[]
         },
        participants: { uv :[]}
    }
      //  obtain response
      const response: any = await controller.updateKata(id, kata, userID);
      //  send to the client the response
     return res.status(200).send(response);
      }else {
        return res.status(400).send({
            message: '[ERROR] Updating kata You need to sen all attrs of kata to update it'
        });
      }     
  })

  .post(jsonParser, verifyToken, async (req: Request, res:Response)=>{
    
        //Read from body
      let name:         string     = req?.body?.name; //campo obligatorio x 
      let description:  string     = req?.body?.description || 'default description';
      let level:        KataLevel  = req?.body?.level ||  KataLevel.BASIC;
      let intents:      number     = req?.body?.intents || 0;
      let stars:        number     = req?.body?.stars || 0;
      let creator:      any     = req.query?.id; //al no poner opcion or este campo sera obligatorio
      let solution:     string     = req?.body?.solution|| 'default solution';
      //let participants: string []  = req?.body?.participants || [];
        
      if(name && description && level && intents >=0 && stars >=0 && creator && solution ){

        //  Controller instance to execute method
     const controller: KatasController = new KatasController();

     //datos de prueba
     let kata: IKata ={
        name: name,
        description: description,
        level: level,
        intents: intents,
        stars: stars,
        creator: creator,
        solution: { 
          solution: solution,
          uSolutions:[]
         },
         participants: { uv :[] }

    }

      //  obtain response
      const response: any = await controller.createKata(kata);
      //  send to the client the response
     return res.status(200).send(response);
    }else {
        return res.status(400).send({
            message: '[ERROR] Creating kata You need to sen all attrs of kata to create it'
        });
    }

  })


  katasRouter.route('/level') // de esta forma enviamos a mas niveles las consultas filtradas 
.get(jsonParser,verifyToken,async(req: Request, res:Response) =>{
    //obtain query params (level)
    
    let level: KataLevel = req?.body?.level
    //dara un mensaje por consola
    LogInfo(`Query param ${level}`);

    //Controller instance to execute method
  const controller: KatasController = new KatasController();
  //obtain response 
  const response: any = await controller.filterKatasByLevel(level);
  // send to the client the response
  return res.status(200).send(response);

})

katasRouter.route('/stars') // de esta forma enviamos a mas niveles las consultas filtradas 
.get(jsonParser,verifyToken,async(req: Request, res:Response) =>{
    //obtain query params (stars)
    
    let stars: number = req?.body?.stars
    //dara un mensaje por consola
    LogInfo(`Query param ${stars}`);

    //Controller instance to execute method
  const controller: KatasController = new KatasController();
  //obtain response 
  const response: any = await controller.getKatasByStars(stars);
  // send to the client the response
  return res.status(200).send(response);

})

.put(jsonParser,verifyToken, async(req: Request, res: Response) =>{
  let id: any = req?.query.id;
  let vote: any = req?.body.vote;
  let userID: any = req?.body?.userID;

  


    LogInfo(`Query Param: ${id}, ${vote}`);
  const controller: KatasController = new KatasController();

  const response: any = await controller.updateKatasValoration(id, vote, userID);

  return res.status(200).send(response);
      
  }  
)

katasRouter.route('/solution')
//solve kata by id
.put(jsonParser, verifyToken, async( req: Request, res: Response)=> {
  let id: any = req?.query.id;
  let solution : any = req?.body.solution;
  let userID :any = req?.body.userID;

  LogInfo(`Query param: ${id}, ${solution}`);
const controller: KatasController = new KatasController();

const response: any = await controller.solutionKata(id, solution, userID)

  return res.status(200).send(response);
})


// Export Hello Router
export default katasRouter;

