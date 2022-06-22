import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IKataController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Katas Collection
import { deleteKataByID, getAllKatas , getKataByID, createKata, updateKataByID} from "../domain/orm/kata.orm";
import { IKata } from "../domain/interfaces/IKata.interface";

@Route("/api/katas")
@Tags("KatasController")
export class KatasController implements IKataController{

     /**
     * 
     * @param {string} id Id of kata to retrieve (optional)
     * @returns All Katas or kata found by ID
     */
      @Get("/")
      public async getKatas(@Query() page: number, @Query()limit: number ,@Query()id?: string): Promise<any> {
          
          let response: any = '';
  
          if(id){ //si recibe el query param por ID muestralo
              LogSuccess(`[/api/katas] Get Kata By ID: ${id}`)
              response = await getKataByID(id);
                
             
          }else { //de lo contrario sino viene con id muestralos todos 
              LogSuccess(`[/api/katas] Get All Katas Request`)
              response= await getAllKatas(page, limit);

                 }
          return response;
          
        }
        
     /**
     * Endpoint to delete Katas in the Collection Katas of DB
     * @param {string} id Id of kata to delete  (optional)
     * @returns message informing if deletion was correct
     */
      @Delete("/")
      public async deleteKata(@Query()id?: string): Promise<any> {
          
          let response: any = '';
  
          if(id){ //si recibe el query param por ID muestralo
              LogSuccess(`[/api/katas] Delete Kata By ID: ${id}`)
              await deleteKataByID(id).then((r) =>{
                  response = {
                      message: `Kata with id ${id} deleted succesfully`
                  }
              })
          }else { //de lo contrario sino viene con id muestralos todos 
              LogWarning(`[/api/katas] Delete Kata Request WITHOUT ID`)
              response= {
                  message: 'Please provide  an ID to remove from database '
              }
                 }
          return response;
      }


     /**
     * 
     * create new kata 
     * @param Kata  to retrieve (optional)
     * 
     */
      @Post("/")
      public async createKata(kata: IKata): Promise<any> {
          
          let response : any ='';
          
          if(kata){ //si recibe el query param por ID muestralo
              LogSuccess(`[/api/katas] Register New Kata ${kata.name}`)
              await createKata(kata).then((r) => {
                  LogSuccess(`[/api/katas] Create Kata: ${kata.name}`);
                  response ={
                      message: `Kata created successfully: ${kata.name}`
                  }
              })
          }else { //de lo contrario sino viene con id muestralos todos 
              LogWarning(`[/api/katas] Register needs Kata Entity`)
              response = {
                  message: 'Pleaase, provide a Kata Entity to create one'
              }
            }  
            return response ;
         
      }
    

    /**
     * Endpoint to update katas by ID
     * @param id 
     * @param kata
     * @returns 
     */
     @Put("/")
     public async updateKata(@Query()id: string, kata: IKata): Promise<any> {
         let response: any = '';
 
         if(id){ //si recibe el query param por ID muestralo
             LogSuccess(`[/api/katas]  Update Kata By ID: ${id}`)
             await updateKataByID(id, kata).then((r) =>{
                 response = {
                     message: `Kata with id ${id} Updated succesfully`
                 }
             })
         }else { //de lo contrario sino viene con id muestralos todos 
             LogWarning(`[/api/katas] Update Kata Request WITHOUT ID`)
             response= {
                 message: 'Please provide  an ID to update an existing user '
             }
                }
         return response;
     }
    

}