import { IKatas } from '../../domain/interfaces/IKatas.interface';
import { IUser } from '../../domain/interfaces/IUser.interface';
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
   
    //Update User
    updateUSer(id:string, user:any):Promise<any>
}

export interface IKatasController{
    //Read all katas from database || get katas By ID || get Katas by level
    getKatas(id?:string): Promise<any>
    //Delete kata By ID
    deleteKata(id:string): Promise<any>
    //Create New kata
    createKata(katas: IKatas):Promise<any>
    //Update Kata
    updateKata(id: string, katas:any): Promise<any>
    // Read Katas by Dificult Level
    filterKatasByLevel(level:number): Promise<any>
    //Read Katas most recently
    getKatasRecently():Promise<any>
    //List Katas by valorations 
    getKatasValorated(): Promise<any>
    //Update Valorations of kata 
    updateKatasValoration(id: string, vote: any, userID: any): Promise<any>
    //get katas by tries
    getKatasTried(): Promise <any>

}

export interface IAuthController {
    //register Users
    registerUser(user : IUser): Promise <any>
    //Login user 
    loginUser(auth: any):Promise <any>
}