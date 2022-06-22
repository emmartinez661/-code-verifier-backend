/* import mongoose from "mongoose";
import { IKatas } from "../interfaces/IKatas.interface";

export const katasEntity = () =>{

 

    let katasSchema = new mongoose.Schema<IKatas>(
        {
            name:           {type:String},
            description:        {type:String},
            level:              {type: Number},
            user:               {type:String},
            date:               {type:Date},
            valoration:         {type:Number},
            chances:            {type:Number},
               numValorations :[{
                user_id : {type: String}, 
                valoration_item:{type:Number}
             }]  
            }
    )

    return mongoose.models.Katas || mongoose.model<IKatas>('Katas',katasSchema)
} */