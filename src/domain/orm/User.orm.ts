import { userEntity } from "../entities/User.entities";
import { LogError, LogSuccess } from "../../utils/logger";

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
        LogError ('[ORM ERROR]: Getting all Users: ${error}');
    }


}

    // - GET User By ID
export const getUserByID = async (id: string): Promise<any | undefined> => {
        try {
            let userModel = userEntity();
    
            // Search User By ID
            return await userModel.findById(id)
        } catch (error) {
            LogError ('[ORM ERROR]: Getting User By ID: ${error}');
        }
}

// - Delete User By ID 
export const deleteUserByID = async (id: string): Promise<any | undefined> =>{
   
    try {
        let userModel = userEntity();

        //Delete user by ID
        return await userModel.deleteOne({_id:id})
    
    } catch (error) {
        LogError ('[ORM ERROR]: Deleting User By ID: ${error}');
    }
}


// - Create New User 
export const createUser = async(user: any): Promise<any | undefined> =>{
    try {
        let userModel = userEntity();

        //Create / insert new USer 
        return await userModel.create(user);

    } catch (error) {
        LogError ('[ORM ERROR]: Creating User: ${error}');
    }
}

// - Update User By ID 
export const updateUserByID= async (id:string, user:any ):Promise<any | undefined> =>{
    try {
        let userModel= userEntity();

        //Update user
        return await userModel.findByIdAndUpdate(id, user)
    } catch (error) {
        LogError ('[ORM ERROR]: Updating User: ${error}');
    }
}

//TODO 

// - Get User By Email


