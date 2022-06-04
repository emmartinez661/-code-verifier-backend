//import { updateKatasByValoration } from '@/domain/orm/Katas.orm';
import express, { Request, Response} from 'express';
import { KatasController } from '../controller/KatasController';
import { LogInfo } from '../utils/logger';

//Router from express
let katasRouter = express.Router();

//http:localhost:8000/api/katas/
katasRouter.route('/')
//Get
.get(async (req: Request, res: Response) => {

    // Obtain query params (id)
    let id:any = req?.query?.id;
    //dara un mensaje por consola
    LogInfo(`Query param ${id}`);

    //Controller instance to execute method
    const controller: KatasController = new KatasController();
    //obtain response ID
    const response: any = await controller.getKatas(id);

    //obtain response level
    



    // send to the client the response
    return res.send(response);
})



.delete(async(req:Request, res:Response) => {
    // Obtain query params (id)
    let id:any = req?.query?.id;
    //dara un mensaje por consola
    LogInfo(`Query param ${id}`);
    //Controller instance to execute Method
    const controller: KatasController = new KatasController();
    //obtain response
    const response: any = await controller.deleteKata(id);
    //send to the client the response
    return res.send(response);
})

.post(async(req:Request, res: Response) =>{

    let name:           any = req?.query?.name;
    let description:    any = req?.query?.description;
    let level:          any = req?.query?.level;
    let user:           any = req?.query?.user;
    let date:           any = req?.query?.date;
    let valoration:     any = req?.query?.valoration;
    let chances:        any = req?.query?.chances;

    //Controller instance to execute method
    const controller: KatasController = new KatasController();

    //datos de prueba
    let kata = {
        name:        name           || 'default',
        description: description    || 'default',
        level:        level         || 1,
        user:         user          || 111111,
        date:         date          ||"2001-02-01t04:00:00.000Z",
        valoration:   valoration    || 9,
        chances:      chances       || 3
    }

    //obtain respnse
    const response: any =await controller.createKata(kata);
    //send to the client the respnse
    return res.send(response);
})

.put(async(req: Request, res:Response) =>{
    //obtain query params (ID)
    let id:             any = req?.query?.id;
    let name:           any = req?.query?.name;
    let description:    any = req?.query?.description;
    let level:          any = req?.query?.level;
    let user:           any = req?.query?.user;
    let date:           any = req?.query?.date;
    let valoration:     any = req?.query?.valoration;
    let chances:        any = req?.query?.chances;    
    
    LogInfo(`Query param: ${id}, ${name}, ${description}, ${level}, ${user}, ${date}, ${valoration}, ${chances}`);

    //controller instance to execute method
    const controller: KatasController = new KatasController();

    //datos de prueba 
     let kata = {
        name:        name,
        description: description,
        level:        level,
        user:         user,
        date:         date,
        valoration:   valoration,
        chances:      chances
    }

    //obtain response
    const response: any = await controller.updateKata(id, kata);
    //send to the client the response
    return res.send(response);
})


katasRouter.route('/level',) // de esta forma enviamos a mas niveles las consultas filtradas 
.get(async(req: Request, res:Response) =>{
    //obtain query params (level)
    let level:any = req.query.level;
    //dara un mensaje por consola
    LogInfo(`Query param ${level}`);

    //Controller instance to execute method
  const controller: KatasController = new KatasController();
  //obtain response 
  const response: any = await controller.filterKatasByLevel(level);
  // send to the client the response
  return res.send(response);

})

katasRouter.route('/r')
.get(async(req: Request, res:Response) =>{
    //Controller instance to execute method
  const controller: KatasController = new KatasController();

  const response:any = await controller.getKatasRecently();
  //send to the client the response
  return res.send(response);
} )

katasRouter.route('/valorations')
.get(async(req: Request, res: Response)=>
{
    //controller instance to execute method
    const controller: KatasController = new KatasController();

    const response: any = await controller.getKatasValorated();
    //send to the client the respnse
    return res.send(response);
} )


.put(async (req: Request, res: Response) => {
    //let id: any = req.query.id;
    let name: any = req.query.name;    
    let userID : any = req.query.userID;
    let vote: any= req.query.vote;

    LogInfo(`Query Param: ${name}, ${vote}`);

    const controller: KatasController = new KatasController();


    const response: any = await controller.updateKatasValoration(name, vote, userID);

    return res.send(response);

})

katasRouter.route('/chances')
.get(async(req: Request, res: Response)=>
{
    //controller instance to execute method
    const controller: KatasController = new KatasController();

    const response: any = await controller.getKatasTried();
    //send to the client the respnse
    return res.send(response);
} )


//export Katas Router
export default katasRouter;