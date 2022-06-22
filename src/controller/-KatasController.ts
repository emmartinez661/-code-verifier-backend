/* import { Delete,Get, Post, Put, Query, Route, Tags} from "tsoa";
import { IKatasController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Katas Collection
import { getAllKatas, getKatasByID, deleteKataByID, createKata, updateKataByID, getKatasByLevel, getKatasMostRecently, getKatasByValoration, updateKatasByValoration, getKatasByTries} from "../domain/orm/Katas.orm";
import { IKatas } from "../domain/interfaces/IKatas.interface";

@Route("/api/katas")
@Tags("KatasController")
export class KatasController implements IKatasController{ */
    
   
   
    
    
    /**
     * 
     * @param {string } id Id of Katas to retrive (optional)
     * @returns All Katas or Katas found by ID or katas by dificult level
     */
   /*  @Get("/")
    public async getKatas(@Query()page:number, @Query()limit:number,@Query()id?:string): Promise<any> {

        let response: any = '';

        if (id) {// si recibe el query param por iD muestralo
            //LogSuccess(`[/api/katas] Get Katas By ID: ${id}`)
            
            response = await getKatasByID(id);

        
            
        }else{ // de lo contrario sino viene con id muestra todas las katas
            LogSuccess(`[/api/katas] Get all Katas Request`)
            response = await getAllKatas(page, limit);
        }        
        return response;

    } */

    /**
     * Method to filter katas by level
     * @param level 
     * @returns 
     */
   /*  @Get("/level")
    public async filterKatasByLevel(@Query()level: Number): Promise<any> {
        let response: any = '';
        

        if(level){ //si recibe el query param por level muestralo
            LogSuccess(`[/api/katas/level] Get Katas Filter By Level: ${level}`)
            response = await getKatasByLevel(level)
            console.log(response)
        } if(!level){ // de lo contrario sino viene con level muestra el mensaje
            LogSuccess(`[/api/katas/level] Get Katas Filter Request`)
            return{
                message: 'Please provide an level that exist on DB'
            }            
        }
        return response;
    } */

    /**
     * Method to filter katas by most recently created 
     * @returns 
     */
   /*  @Get('/r')
    public async getKatasRecently(): Promise<any> {
        let response: any = '';
        response = await getKatasMostRecently();          

     return response ;
    }
 */
    /**
     * Method to obtain katas by valorations
     * @returns 
     */
  /*   @Get('valorations')
    public async getKatasValorated(): Promise<any> {
        let response: any = '';
        response = await getKatasByValoration();

        return response
    } */

   

    /**
     * Method to delete kata by id
     * @param id 
     * @returns 
     */
   /*  @Delete("/")
    public async deleteKata(@Query()id?: string): Promise<any>{

        let response: any = '';

        if(id) { //si recibe el query param por ID muestralo
            LogSuccess(`[/api/katas] Delete Kata By ID: ${id}`)
            await deleteKataByID(id).then((r) => {
                response = {
                    message: `Kata with id ${id} deleted successfully`
                }
            })
        }else { //de lo contrario sino viene con id muestralos todos
            LogWarning(`[/api/katas] Delete Kata Request WITHOUT ID`)
            response= {
                message: 'Please provide an ID to remove from database'
            }
        }
        return response;
    } */

    /**
     * Method to create new kata
     * @param katas 
     * @returns 
     */
    /* @Post("/")
    public async createKata(katas: any): Promise<any> {
        
        let response: any = '';

        if(katas){
            await createKata(katas).then((r) =>{
                LogSuccess(`[/api/katas] Create Kata: ${katas}`);
                response = {
                    message: `Kata create successfully ${katas.kataname}` 
                }
            })
        } else {
            LogWarning(`[/api/katas] Create needs katas Entity`)
            response = {
                message: 'Please provide a Kata Entity to create one'
            }
        }
       
        return response;
    } */

    /**
     * Method to update kata by id
     * @param id 
     * @param katas 
     * @returns 
     */
   /*  @Put("/")
    public async updateKata(@Query()id: string, katas: any): Promise<any> {
        
        let response: any = '';

        if(id){
            LogSuccess(`[/api/katas] Update Kata By ID: ${id}`)
            await updateKataByID(id, katas).then((r) =>{
                response = {
                    message: `Kata with id ${id} Update successfullty`
                }
            })
        }else {
            LogWarning('[/api/katas] Update Kata Request Without ID')
            response = {
                message: 'Please provide an ID to update an existing Kata'
            }
        }
        
        return response;
    }
 */
    /**
     * Method to update kata valoration and obtain media of many valorations 
     * @param name 
     * @param vote 
     * @param userID 
     * @returns 
     */
   /*  @Put("/valorations")
    public async updateKatasValoration(@Query()name: string , @Query()vote: any, @Query()userID: any): Promise<any> {
        let response : any = '';

        if(name && vote && userID){
            LogSuccess(`[/api/katas/updateKatasValorations] Update katas By Name: ${name}`)
            await updateKatasByValoration(name, vote, userID).then((r) => {
                response = {
                    message:`Katas with ${name} Updated Succesfully`
                }
            })
        }else{
            LogWarning(`[/api/katas/updateKatasValorations] Update katas Request WITHOUT data`)
            response= {
                message: 'Please provide  an ID to update an existing Kata '
            }
        }
        return response;
    } */

    /**
     * Method to obtain katas sorted by chances o tries 
     * @returns 
     */
 /*    @Get('/chances')
    public async getKatasTried(): Promise<any> {
        let response: any = '';
        response = await getKatasByTries();

        return response
    }

  
} */