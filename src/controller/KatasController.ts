import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IKataController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Katas Collection
import { deleteKataByID, getAllKatas , getKataByID, createKata, updateKataByID, getKatasByLevel, getKataStars, updateKatasByValoration, solutionKataById} from "../domain/orm/kata.orm";
import { IKata, KataLevel } from "../domain/interfaces/IKata.interface";

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
     * Method to filter katas by level
     * @param level 
     * @returns 
     */
     @Get("/level")
    public async filterKatasByLevel(@Query()level: KataLevel): Promise<any> {
        let response: any = '';
        

        if(level){ //si recibe el query param por level muestralo
            LogSuccess(`[/api/katas/level] Get Katas Filter By Level: ${level}`)
            response = await getKatasByLevel(level)
            console.log(response)
        } if(!level){ // de lo contrario sino viene con level muestra el mensaje
            LogSuccess(`[/api/katas/level] Get Katas Filter Request`)
            return{
                message: 'Please provide a Valoration that exist on DB'
            }            
        }
        return response;
    }
    
    
    /**
     * Method to obtain katas by valorations
     * @returns 
     */
     @Get('/stars')
    public async getKatasByStars(@Query()stars?: Number): Promise<any> {
        let response: any = '';
        if(stars){ //si recibe el query param por level muestralo
            LogSuccess(`[/api/katas/level] Get Katas Filter By Level: ${stars}`)
            response = await getKataStars(stars)
            console.log(response)
        } if(!stars){ // de lo contrario sino viene con level muestra el mensaje
            LogSuccess(`[/api/katas/level] Get Katas Filter Request`)
            return{
                message: 'Please provide an level that exist on DB'
            }            
        }
        return response;
    } 
        
     /**
     * Endpoint to delete Katas in the Collection Katas of DB
     * @param {string} id Id of kata to delete  (optional)
     * @returns message informing if deletion was correct
     */
      @Delete("/")
      public async deleteKata(@Query()userID: any,@Query()id?: string ): Promise<any> {
          
          let response: any = '';
  
          if(id){ //si recibe el query param por ID muestralo
              LogSuccess(`[/api/katas] Delete Kata By ID: ${id}`)
              await deleteKataByID(userID, id).then((r) =>{
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
     public async updateKata(@Query()id: string, kata: IKata, userID:any): Promise<any> {
         let response: any = '';
 
         if(id){ //si recibe el query param por ID muestralo
             LogSuccess(`[/api/katas]  Update Kata By ID: ${id}`)
             await updateKataByID(id, kata, userID).then((r) =>{
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
    
     public async updateKatasValoration(@Query()id: any,@Query()vote: any,@Query()userID: any): Promise<any> {
        
        let response: any = '';

        if(id && vote && userID){
            LogSuccess(`[api/katas/updateKatasValorations] Update Katas By Id: ${id}`)
            await updateKatasByValoration(id, vote, userID).then((r) => {
                response = {
                    message: `Katas with ${id} Updated Successfully`
                }
            })
        }else{
            LogWarning(`[/api/katas/updateKatasValorations] Update katas Request Without data`)
            response = {
                message: 'Please provide an ID to update an exsiting Kata'
            }
        }
        return response;
    }


    @Put("/solution")
    public async solutionKata(@Query()id: string,@Query()solution: any,@Query()userID: any): Promise<any> {
    let response : any = ''

    if(id && solution){
        LogSuccess(`[/api/katas/solution] Solution of Kata By ID ${id}`)
         await solutionKataById(id, solution, userID).then((r) => {
            
            response = {
                message: r.katas.solution
            }//r.katas.solution
            
         })
        
    } else {
        LogWarning(`[/api/katas/solution] Solution kata Request Without data`)
        response= {
            message: 'Please provide an ID to solve an existing Kata'
        }
    }
    return response;       

    }

}