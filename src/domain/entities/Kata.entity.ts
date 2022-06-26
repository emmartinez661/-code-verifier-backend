import mongoose from "mongoose";

import { IKata } from "../interfaces/IKata.interface";

export const kataEntity = () =>{
    
     
       let kataSchema = new mongoose.Schema<IKata>(
           {
               name:        {type: String, required: true},
               description: {type: String, required: true},
               level:       {type: String, required: true},
               intents:     {type: Number, required: false}, 
               stars:       {type: Number, required: false},
               creator:     {type: String, required: true}, //id of user
               solution:    {
                solution: { type: String, required: true},
                uSolutions: { type: [], required: false}
                },
                participants:{ 
                    uv: {type: [], required: false  }
                }
           }
       )
   
       return mongoose.models.katas || mongoose.model<IKata>('katas',kataSchema);
       
   }