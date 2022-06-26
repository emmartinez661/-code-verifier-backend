import { kataEntity } from "../entities/Kata.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IKata, KataLevel } from "../interfaces/IKata.interface";


//Enviroment variables
import dotenv from 'dotenv'
import { userEntity } from "../entities/User.entity";
import { response } from "express";


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



// -Get Katas By Level
 export const getKatasByLevel = async (level: KataLevel): Promise<any | undefined> =>{
    try {
        let kataModel = kataEntity();        
        //Search katas by difficult level
        return await kataModel.find({level:level})
               
    } catch (error) {
        LogError(`[ORM ERROR]: Getting Katas By difficult Level: ${error}` )
    }

}

// - Get kata by Valoration
 export const getKataStars = async (stars: Number): Promise<any[] | undefined> =>
{
    try 
    {
        let kataModel = kataEntity();

        //get katas best to less valorated
        return await kataModel.find({stars: stars})
    }catch(error){
        LogError(`[ORM ERROR]: Getting katas sort by valorations: ${error}`)
    }
} 


/**
 * Method to delete kata by ID
 * @param id 
 * @returns 
 */
// - Delete User By ID 
export const deleteKataByID = async (userID: any,id: string): Promise<any | undefined> =>{
   
    try {
        let kataModel = kataEntity();

        await kataModel.findById(id).then(async(katatoDelete: any)=>{
            if(userID == katatoDelete.creator){
                //Delete user by ID
               return await kataModel.findByIdAndDelete(id)
            }else {
                return await ({
                    message: 'You are not allowed to delete this kata'
                })
            }
        } )
    } catch (error) {
        LogError (`[ORM ERROR]: Deleting Kata By ID: ${error}`);
    }
}




/**
 * Method to create new kata
 * @param kata
 * @returns 
 */
// - Create New KAta 
export const createKata = async(kata: IKata): Promise<any | undefined> =>{
    try {
        let kataModel = kataEntity();
        let userModel = userEntity();

        //Create / insert new USer 
        return await kataModel.create(kata)
        .then(async(kataID:any)=>{
            return await userModel.findByIdAndUpdate(kata.creator ,                
                    { $push: { katas: kataID.id }
                })
        })

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
export const updateKataByID= async (id:string, kata:IKata, userID:any ):Promise<any | undefined> =>{
    try {
        let kataModel= kataEntity();
        
        //Update user
        return await kataModel.findById(id).then(async(kataUpdate: any)=> {
            if(userID == kataUpdate.creator){
                await kataModel.findByIdAndUpdate(id,
                    {
                        name: kata.name,
                        description: kata.description,
                        level: kata.level,
                         solution: { solution:  kata.solution.solution   }
                })
            }else {
                return await ({
                    message: 'You are not allowed to update this kata'
                })
            }
        })
    } catch (error) {
        LogError (`[ORM ERROR]: Updating Kata: ${error}`);
    }
}

 export const updateKatasByValoration = async(id: string, vote: any, userID: any):Promise <any | undefined> =>
 {    
    try {
        let kataModel = kataEntity();
        let response: any = {}

        await kataModel.findById(id).then(async(katasVal: any ) => 
        {
            if(katasVal !== ''){
               /*  response.katas = await kataModel.bulkWrite([
                {   updateOne : 
                    { "filter": {_id : id},
                    "update" : { $push: { 'participants': 
                    {user_id : userID, 'vote': vote}}}}},
                    {
                        updateOne :
                        {"filter": { _id: id},
                        "update": [  { $set : { "stars": { $avg :
                            "$participants.vote"
                            
                        }}}]}},
        ]) */

                const oldVotes = katasVal.stars
                const totalVotes: any[]=  katasVal.participants.uv
                const newStars = ((+oldVotes  * +totalVotes.length) + +vote) / (+totalVotes.length + 1)
                response.katas = await kataModel.findByIdAndUpdate(id, {'stars': newStars, $push: { 'participants.uv':{ user_id : userID, stars: vote}}})

            } else {
                response.message = 'you cannot update this kata'
            }
        })
        return response;;
    } catch(error) {
        LogError (`[ORM ERROR]: Updating Valoration of Kata: ${error}`);
    }   
 }

 // solution of kata by ID
 export const solutionKataById = async(id: string , solution: any, userID: any):Promise<any | undefined>=>
 {
    try {
        let kataModel = kataEntity();   
        let response: any = {};
        let sum = 1;
        

        await kataModel. findById(id).then(async(solutionUser: IKata) =>{
            
            if(solutionUser){
            response.katas = await kataModel.findByIdAndUpdate(id, 
                {   
                    $push: { 
                        'solution.uSolutions': { 
                        user_id: userID, 
                        solution: solution }}
                }).then(async(kataSolve: any) => {
                    return kataSolve.solution
                })

                
                
                
            } else {
                response.message = 'you cannot solve this kata'   
            }
        })
        return response
    } catch (error) {
        LogError (`[ORM ERROR]: Solving kata  ${error}`);
    }
 }
