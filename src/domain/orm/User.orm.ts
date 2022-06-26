import { userEntity } from "../entities/User.entity";
import { kataEntity } from "../entities/Kata.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import { IKata } from "../interfaces/IKata.interface";

//Enviroment variables
import dotenv from 'dotenv'

//BCRYPT FOR PASSWORD
import bcrypt from 'bcrypt'

//JWT 
import jwt from 'jsonwebtoken'
import { tokenToString } from "typescript";
import { UserResponse } from "../types/UsersResponse.type";

import mongoose from "mongoose";
import { response } from "express";

//Configuration of environment variables
dotenv. config();

//Obtain Secret key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY';

// CRUD 

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server 
 */
export const getAllUsers = async (page: number, limit:number): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        let response:any = {};

        // search all users (using pagination)
        await userModel.find({isDelete: false})
        .select('name email age katas')
        .limit(limit)
        .skip((page - 1) * limit)
        .exec().then((users: IUser[]) =>{

           /*  users.forEach((user: IUser) =>{
                //Clean Passwords from result
               user.password = ''; 
            }) */

            response.users= users
        })



        //Count total documents in Collection "Users"
        await userModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response; 

        //return await userModel.find({isDelete: false})

    } catch (error) {
        LogError (`[ORM ERROR]: Getting all Users: ${error}`);
    }
}


/**
 * Method to get users by ID
 * @param id 
 * @returns user especific by id
 */
    // - GET User By ID
export const getUserByID = async (id: string): Promise<any | undefined> => {
        try {
            let userModel = userEntity();
    
            // Search User By ID
            return await userModel.findById(id)
            .select('name email age katas')
        } catch (error) {
            LogError (`[ORM ERROR]: Getting User By ID: ${error}`);
        }
}
/**
 * Method to delete user by ID
 * @param id 
 * @returns 
 */
// - Delete User By ID 
export const deleteUserByID = async (id: string): Promise<any | undefined> =>{
   
    try {
        let userModel = userEntity();

        //Delete user by ID
        return await userModel.deleteOne({_id:id})
    
    } catch (error) {
        LogError (`[ORM ERROR]: Deleting User By ID: ${error}`);
    }
}

/**
 * Method to create new user
 * @param user 
 * @returns 
 */
// - Create New User 
export const createUser = async(user: any): Promise<any | undefined> =>{
    try {
        let userModel = userEntity();

        //Create / insert new USer 
        return await userModel.create(user);

    } catch (error) {
        LogError (`[ORM ERROR]: Creating User: ${error}`);
    }
}

/**
 * 
 * id Method to update user by ID
 * @param id
 * @param user 
 * @returns 
 */
// - Update User By ID 
export const updateUserByID= async (id:string, user:any ):Promise<any | undefined> =>{
    try {
        let userModel= userEntity();

        //Update user
        return await userModel.findByIdAndUpdate(id, user)
    } catch (error) {
        LogError (`[ORM ERROR]: Updating User: ${error}`);
    }
}

/**
 * Method to register or create new user
 * @param user 
 * @returns 
 */
//Register User 
export const registerUser = async (user: IUser): Promise <any | undefined> =>{

try {
    let userModel = userEntity();

    //Create / insert new USer 
    return await userModel.create(user);

} catch (error) {
    LogError (`[ORM ERROR]: Creating User: ${error}`);
}
    
}

/**
 * Method to validate token and validate user to login
 * @param auth 
 * @returns 
 */
//Login User 
export const loginUser = async (auth: IAuth): Promise <any | undefined> =>{
//TODO NOT IMPLEMENTED 
try {
    let userModel = userEntity()

    let userFound: IUser | undefined = undefined;
    let token = undefined;

    //Check if user exists by Unique Email
    await userModel.findOne({email: auth.email}).then((user: IUser) => {
        userFound= user;
    }).catch((error) => {
        console.error(`[ERROR Authentication in ORM]: User Not Found`);
        throw new Error (`[ERROR Authentication in ORM]: User Not Found: ${error}`);
    });

    let validPassword = bcrypt.compareSync(auth.password, userFound!.password);
    
    //Check if Password is Valid (compare with bcrypt )
    if(!validPassword){
        console.error(`[ERROR Authentication in ORM]: Password Not Valid`);
        throw new Error (`[ERROR Authentication in ORM]: Password Not Valid`);
    }


    //Generate JWT
         token = jwt.sign({email: userFound!.email},  secret, {expiresIn: "2h"})

    return {
        user: userFound,
        token: token
    }

} catch (error) {
    
}
    
}

/**
 * Method to logout user
 */
export const logoutUser = async ():Promise <any | undefined> =>{
    //TODO NOT IMPLEMENTED 
        
    }

    /**
    * Method to obtain all Users from Collection "Users" in Mongo Server 
    */
   export const getKatasFromUser = async (page: number, limit:number,id: string): Promise<any[] | undefined> => {
       try {
           let userModel = userEntity();
           let katasModel = kataEntity();
   
           let katasFound: IKata[] = [];

           let response:any = {};
   
          await userModel.findById(id).then(async(user: IUser) =>{
            response.user = user.email;

            //Create types to search
            let objectIds: mongoose.Types.ObjectId[] = [];
            user.katas.forEach((kataID: string) => {
                let objectID = new mongoose.Types.ObjectId(kataID);
                objectIds.push(objectID);
            });

            await katasModel.find({"_id":{"$in":objectIds}}).then((katas: IKata[])=>{
               katasFound = katas;               
            })
          }).catch((error) =>{
            LogError(`[ORM ERROR]: Obtaining User: ${error}`)
          })
          response.katas = katasFound;
           return response; 
   
           //return await userModel.find({isDelete: false})
   
       } catch (error) {
           LogError (`[ORM ERROR]: Getting all Users: ${error}`);
       }
   }

   


