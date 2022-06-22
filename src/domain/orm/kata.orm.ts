import { kataEntity } from "../entities/Kata.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IKata } from "../interfaces/IKata.interface";


//Enviroment variables
import dotenv from 'dotenv'


//Configuration of environment variables
dotenv. config();


// CRUD 

/**
 * Method to obtain all Katas from Collection "Katas" in Mongo Server 
 */
export const getAllKatas = async (page: number, limit:number): Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();

        let response:any = {};

        // search all users (using pagination)
        await kataModel.find({isDelete: false})
        .limit(limit)
        .skip((page - 1) * limit)
        .exec().then((katas: IKata[]) =>{

            response.katas= katas
        })



        //Count total documents in Collection "Katas"
        await kataModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response; 


    } catch (error) {
        LogError (`[ORM ERROR]: Getting all Katas: ${error}`);
    }
}


/**
 * Method to get kata by ID
 * @param id 
 * @returns kata especific by id
 */
    // - GET Kata By ID
export const getKataByID = async (id: string): Promise<any | undefined> => {
        try {
            let kataModel = kataEntity();
    
            // Search User By ID
            return await kataModel.findById(id)
        } catch (error) {
            LogError (`[ORM ERROR]: Getting Kata By ID: ${error}`);
        }
}


/**
 * Method to delete kata by ID
 * @param id 
 * @returns 
 */
// - Delete User By ID 
export const deleteKataByID = async (id: string): Promise<any | undefined> =>{
   
    try {
        let kataModel = kataEntity();

        //Delete user by ID
        return await kataModel.deleteOne({_id:id})
    
    } catch (error) {
        LogError (`[ORM ERROR]: Deleting Kata By ID: ${error}`);
    }
}

/**
 * Method to create new kata
 * @param kata
 * @returns 
 */
// - Create New User 
export const createKata = async(kata: IKata): Promise<any | undefined> =>{
    try {
        let kataModel = kataEntity();

        //Create / insert new USer 
        return await kataModel.create(kata);

    } catch (error) {
        LogError (`[ORM ERROR]: Creating Kata: ${error}`);
    }
}

/**
 * 
 * id Method to update Kata by ID
 * @param id
 * @param kata
 * @returns 
 */
// - Update User By ID 
export const updateKataByID= async (id:string, kata:IKata ):Promise<any | undefined> =>{
    try {
        let kataModel= kataEntity();

        //Update user
        return await kataModel.findByIdAndUpdate(id, kata)
    } catch (error) {
        LogError (`[ORM ERROR]: Updating Kata: ${error}`);
    }
}
