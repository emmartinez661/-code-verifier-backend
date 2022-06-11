import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interfaces";

//orm imports 
import { registerUser, loginUser, logoutUser, getUserByID } from "../domain/orm/User.orm";
import { AuthResponse, ErrorResponse } from "./types";
import { tokenToString } from "typescript";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {

    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {
        
        let response : any ='';
        
        if(user){ //si recibe el query param por ID muestralo
            LogSuccess(`[/api/auth/register] Register New User ${user.email}`)
            await registerUser(user).then((r) => {
                LogSuccess(`[/api/auth/register] Create User: ${user.email}`);
                response ={
                    message: `User created successfully: ${user.name}`
                }
            })
        }else { //de lo contrario sino viene con id muestralos todos 
            LogSuccess(`[/api/auth/register] Register needs User Entity`)
            response = {
                message: 'Pleaase, provide a User Entity to create one'
            }
          }  
          return response ;
       
    }

    

    @Post("/login")
    public async loginUser(auth: IAuth): Promise<any> {
        //todo implement login user 
        let response : AuthResponse | ErrorResponse | undefined;

        if(auth ){
            LogSuccess(`[/api/auth/login] auth User  ${auth.email}`);
            let data = await loginUser(auth);
                response ={
                    token: data.token, //JWT generated for logged user 
                    message: `Welcome, ${data.user.name}`
                }
            

        }else {
            LogSuccess(`[/api/auth/login] Login needs Auth Entity(email && password)`)
            response = {
                message: 'Pleaase, provide a email && password to login',
            error: '[AUTH ERROR]: Email & Password are needed'
            }

        }
        return response;
        
    }


      /**
     * Endpoint to retrieve the User in the Collection "Users " of DB
     * Middleware: Validate JWT
     * In headers you most add the x-access-token with a valid JWT
     * @param {string} id Id of user to retrieve (optional)
     * @returns All user o user found by ID
     */
       @Get("/me")
       public async userData(@Query()id: string): Promise<any> {
           
           let response: any = '';
   
           if(id){ //si recibe el query param por ID muestralo
               LogSuccess(`[/api/users] Get User Data By ID: ${id}`)
               response = await getUserByID(id);
               //Remove the password 
               response.password='';
           }
           return response;
       }


    @Post("logout")
    public async logoutUser(): Promise <any>{
        let response : any ='';
        //todo close session of user
        throw new Error("Method not implemented.");
    }

    
}