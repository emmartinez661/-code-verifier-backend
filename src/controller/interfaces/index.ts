import { BasicResponse, GoodByeResponse } from '../types';

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>;
}

export interface IGoodByeController {
    getMessage(name?:string): Promise<GoodByeResponse>;
}

export interface IUserController{
    //Read all users from database || get User By ID
    getUsers(id?:string): Promise<any>
    //Delete User By ID
    deleteUser(id:string):Promise<any>
    // Create new USer
    createUser(user: any): Promise<any>
    //Update User
    updateUSer(id:string, user:any):Promise<any>
}