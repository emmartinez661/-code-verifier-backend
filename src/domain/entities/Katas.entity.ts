import mongoose from "mongoose";

export const katasEntity = () =>{
    let katasSchema = new mongoose.Schema(
        {
            name: String,
            description: String,
            level: Number,
            user: Number,
            date: Date,
            valoration: Number,
            chances: Number,
            numValorations : { 
                user_id: { type : String },
                valoration_item :{ type : Number}
             }
        }
    )

    return mongoose.models.Katas || mongoose.model('Katas',katasSchema)
}