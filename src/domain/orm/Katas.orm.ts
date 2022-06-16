import { katasEntity } from "../entities/Katas.entity";
import { LogSuccess, LogError } from "../../utils/logger";
import { response } from "express";
import { IKatas } from "../interfaces/IKatas.interface";

// CRUD
/**
 * Method to obtain al katas from Collection "Katas" in Mongo server
 */
export const getAllKatas= async (page: number, limit:number): Promise<any[] | undefined> => {
    try {
        let katasModel = katasEntity();

        let response: any = {};

        //search all katas using(pagination)
        await katasModel.find({isDelete: false})
        .limit(limit)
        .skip((page -1) *limit)
        .exec().then((katas: IKatas[] )=>{
            response.katas= katas
        })

        //Count total documents in collection Katas
        await katasModel.countDocuments().then((total: number) =>{
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;


         
        })

        return response

        // search all Katas
        //return await katasModel.find({isDelete: false})
    } catch (error){
        LogError (`[ORM ERROR]: Getting all Katas: ${error}`);
    }
}

// - GET Katas By ID

export const getKatasByID = async ( id : string): Promise<any | undefined > => {
    try {
        let katasModel = katasEntity();

        //Search Katas By ID
        return await katasModel.findById(id)
    }catch(error){
        LogError ( `[ORM ERROR]: Getting katas By ID: ${error}`);
    }
}

// - Delete Kata By ID
export const deleteKataByID = async (id:string ): Promise<any | undefined> =>{
    try {
        let katasModel = katasEntity();

        //delete kata By ID
        return await katasModel.deleteOne({_id:id})
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting Kata By ID: ${error}`);
    }    
}

// - Create New Kata
export const createKata = async(katas: any): Promise <any | undefined> =>{
    try {
        let katasModel = katasEntity();

        //Create / insert new Kata
        return await katasModel.create(katas);
    } catch (error) {
        LogError(`[ORM ERROR]: Creating kata: ${error}`);
    }
}


// - Update Kata By ID
export const updateKataByID = async(id:string, katas: any): Promise <any | undefined> =>{
    try {
        let katasModel = katasEntity();

        //update kata 
        return await katasModel.findByIdAndUpdate(id, katas)
    } catch (error) {
        LogError(`[ORM ERROR]: Updating Kata: ${error}`);
    }
}

// -Get Katas By Level
export const getKatasByLevel = async (level: Number): Promise<any | undefined> =>{
    try {
        let katasModel = katasEntity();

        //Search katas by difficult level
        return await katasModel.find({level:level})
    } catch (error) {
        LogError(`[ORM ERROR]: Getting Katas By difficult Level: ${error}` )
    }

}

// - Get Katas Most Recently
export const getKatasMostRecently = async (): Promise<any[] | undefined> =>
{   
    try 
    {
        let katasModel = katasEntity();

        //get 5 katas most Recently
        return await katasModel.find({}).sort({"date" : -1}).limit(5)
    }catch (error){
        LogError(`[ORM ERROR]: Getting 5 katas most recently: ${error}`)
    }
    
}

// - Get kata by Valoration
export const getKatasByValoration = async (): Promise<any[] | undefined> =>
{
    try 
    {
        let katasModel = katasEntity();

        //get katas best to less valorated
        return await katasModel.find({}).sort({"valoration" : -1})
    }catch(error){
        LogError(`[ORM ERROR]: Getting katas sort by valorations: ${error}`)
    }
}

// - update kata by valoration and get media of many valorations
export const updateKatasByValoration = async (name: string ,vote: any, userID: any):Promise<any | undefined> => 
{
    try 
    {
        let katasModel = katasEntity();
        let response: any = {}

        await katasModel.find({name}).then(async (katasVal: any) => {
            if( katasVal !== ''){
            response.katas = await katasModel.bulkWrite([
                {   updateOne : 
                    {"filter": { name : name}, 
                    "update" : { $push: { 'numValorations':  {user_id  : userID, 'valoration_item' : vote}}}}},
                       
                { updateOne :     
                    { "filter" :     { name : name},        
                       "update" :[  { $set :{ "valoration" :{ $avg : "$numValorations.valoration_item" }}}]}},
                       
                    
                    ])
                
            } else {
                response.message = 'you cannot update this kata'
            }
        })
        
        return response;
    }catch(error){
        LogError (`[ORM ERROR]: Updating Valoration of Kata: ${error}`);
    }
}

// - Get katas by tries o chances maked 
export const getKatasByTries = async (): Promise<any[] | undefined> =>
{
    try 
    {
        let katasModel = katasEntity();

        //get katas best to less valorated
        return await katasModel.find({}).sort({"chances" : -1})
    }catch(error){
        LogError(`[ORM ERROR]: Getting katas sort by tries: ${error}`)
    }
}

//TODO
// - GETs