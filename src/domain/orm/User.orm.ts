import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interfaces";

//BCRYPT FOR PASSWORD
import bcrypt from 'bcrypt'

//JWT 
import jwt from 'jsonwebtoken'
import { tokenToString } from "typescript";

// CRUD 

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server 
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        // search all users
        return await userModel.find({isDelete: false})

    } catch (error) {
        LogError (`[ORM ERROR]: Getting all Users: ${error}`);
    }


}

    // - GET User By ID
export const getUserByID = async (id: string): Promise<any | undefined> => {
        try {
            let userModel = userEntity();
    
            // Search User By ID
            return await userModel.findById(id)
        } catch (error) {
            LogError (`[ORM ERROR]: Getting User By ID: ${error}`);
        }
}

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

//Login User 
export const loginUser = async (auth: IAuth): Promise <any | undefined> =>{
//TODO NOT IMPLEMENTED 
try {
    let userModel = userEntity()

    //find User by email
    userModel.findOne({email: auth.email}, (err: any , user:IUser) =>{
        if(err){
            //TODO RETURN ERROR  ==>> ERROR WHILE SEARCHING (500)

        }
        if(!user){
            //TODO ERROR NOT FOUND (404)
        }

        //use bcrypt to Compare Password 
        let validPassword = bcrypt.compareSync(auth.password, user.password);

        if(!validPassword){
            //TODO >> not authorised (401)
        }

        //create JWT 
        //TODO SECRET MUST BE IN .ENV
        let token = jwt.sign({email: user.email},  'MYSECRET', {expiresIn: "2h"})

        return token;
    });

    
} catch (error) {
    
}
    
}

export const logoutUser = async ():Promise <any | undefined> =>{
    //TODO NOT IMPLEMENTED 
        
    }


