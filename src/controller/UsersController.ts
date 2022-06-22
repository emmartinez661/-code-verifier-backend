import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces"; 
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Users Collection
import { deleteUserByID, getAllUsers , getUserByID, createUser, updateUserByID, getKatasFromUser} from "../domain/orm/User.orm";
import { BasicResponse } from "./types";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController{

   
    
    /**
     * 
     * @param {string} id Id of user to retrieve (optional)
     * @returns All user o user found by ID
     */
    @Get("/")
    public async getUsers(@Query() page: number, @Query()limit: number ,@Query()id?: string): Promise<any> {
        
        let response: any = '';

        if(id){ //si recibe el query param por ID muestralo
            LogSuccess(`[/api/users] Get User By ID: ${id}`)
            response = await getUserByID(id);
              //Remove the password 
           // response.password='';
           //con el select en la funcion user orm estamos filtrando los datos que necesitamos sin necesidad de limpiar la passowrd 
        }else { //de lo contrario sino viene con id muestralos todos 
            LogSuccess(`[/api/users] Get All User Request`)
            response= await getAllUsers(page, limit);
              //TODO remove password from response
               }
        return response;
       
    }
    
    /**
     * Endpoint to delete Users in the Collection Users of DB
     * @param {string} id Id of user to delete  (optional)
     * @returns message informing if deletion was correct
     */
    @Delete("/")
    public async deleteUser(@Query()id?: string): Promise<any> {
        
        let response: any = '';

        if(id){ //si recibe el query param por ID muestralo
            LogSuccess(`[/api/users] Delete User By ID: ${id}`)
            await deleteUserByID(id).then((r) =>{
                response = {
                    message: `User with id ${id} deleted succesfully`
                }
            })
        }else { //de lo contrario sino viene con id muestralos todos 
            LogWarning(`[/api/users] Delete User Request WITHOUT ID`)
            response= {
                message: 'Please provide  an ID to remove from database '
            }
               }
        return response;
    }



    /**
     * Endpoint to update users by ID
     * @param id 
     * @param user 
     * @returns 
     */
    @Put("/")
    public async updateUSer(@Query()id: string, user: any): Promise<any> {
        let response: any = '';

        if(id){ //si recibe el query param por ID muestralo
            LogSuccess(`[/api/users]  Update User By ID: ${id}`)
            await updateUserByID(id, user).then((r) =>{
                response = {
                    message: `User with id ${id} Updated succesfully`
                }
            })
        }else { //de lo contrario sino viene con id muestralos todos 
            LogWarning(`[/api/users] Update User Request WITHOUT ID`)
            response= {
                message: 'Please provide  an ID to update an existing user '
            }
               }
        return response;
    }

    @Get('/katas') //users/katas
    public async getKatas(@Query() page: number, @Query()limit: number ,@Query()id: string): Promise<any> {
        let response: any = '';

        if(id){ //si recibe el query param por ID muestralo
            LogSuccess(`[/api/users/katas] Get Katas from user by ID: ${id}`)
            response = await getKatasFromUser(page,limit,id);
             
        }else { //de lo contrario sino viene con id muestralos todos 
            LogSuccess(`[/api/users/katas] Get All Katas without id`)
            response= {
                message: 'ID from user is needed'
            }
              //TODO remove password from response
               }
        return response;
     
            
        
        
    }

    
   
}