//import { IKatas } from '../../domain/interfaces/IKatas.interface';

import { IKata, KataLevel } from '../../domain/interfaces/IKata.interface';
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
    getUsers(page: number, limit: number, id?:string): Promise<any>
    //Get Katas of User
    getKatas(page: number, limit: number, id?:string):Promise<any>    
    //Delete User By ID
    deleteUser(id:string):Promise<any>   
    //Update User
    updateUSer(id:string, user:any):Promise<any>
}

/* export interface IKatasController{
    //Read all katas from database || get katas By ID || get Katas by level
    getKatas(page: number, limit: number,id?:string): Promise<any>
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

} */

export interface IAuthController {
    //register Users
    registerUser(user : IUser): Promise <any>
    //Login user 
    loginUser(auth: any):Promise <any>
}

export interface IKataController{
    //Read all katas from database || get Kata By ID
    getKatas(page: number, limit: number, id?:string): Promise<any>
    //Get Katas By level
    filterKatasByLevel(level?:KataLevel): Promise<any>
    //Get Katas by Stars (Valoration)
    getKatasByStars(stars?:number):Promise<any>
    //Create new Kata    
    createKata(kata: IKata): Promise <any>
    //Delete Kata By ID
    deleteKata(id:string, userID: any):Promise<any>   
    //Update Kata
    updateKata(id:string, kata:IKata,userID:any):Promise<any>
    //Update Valorations of kata 
    updateKatasValoration(id: string, vote: any, userID: any): Promise<any>
    //solve kata by ID
    solutionKata(id:string , solution: any , userID: any):Promise<any>
}