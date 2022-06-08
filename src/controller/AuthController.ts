import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interfaces";

//orm imports 
import { registerUser, loginUser, logoutUser } from "../domain/orm/User.orm";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {

    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {
        
        let response : any ='';
        
        if(user){ //si recibe el query param por ID muestralo
            LogSuccess(`[/api/auth/register] Register New User ${user}`)
            await registerUser(user).then((r) => {
                LogSuccess(`[/api/auth/register] Create User: ${user}`);
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
        let response : any ='';

        if(auth ){
            LogSuccess(`[/api/auth/login] auth User  ${auth.email}`)
            await loginUser(auth).then((r) => {
                LogSuccess(`[/api/auth/login] Logged User: ${auth.email}`);
                response ={
                    message: `User Logged in successfully: ${auth.email}`,
                    token: r.token //JWT generated for logged user 
                }
            })

        }else {
            LogSuccess(`[/api/auth/login] Login needs Auth Entity(email && password)`)
            response = {
                message: 'Pleaase, provide a email && password to login'
            }

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