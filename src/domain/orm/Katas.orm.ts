import { kataEntity } from "../entities/Kata.entities";
import { LogSuccess, LogError } from "@/utils/logger";

// CRUD
/**
 * Method to obtain al katas from Collection "Katas" in Mongo server
 */
export const GetAllKata= async (): Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();

        // search all Katas
        return await kataModel.find({isDelete: false})
    } catch (error){
        LogError ('[ORM ERROR]: Getting all Kata: ${error}');
    }
}

//TODO
// - GETs