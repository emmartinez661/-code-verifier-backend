export enum KataLevel  {
    BASIC= 'Basic',     //0
    MEDIUM= 'Medium',   // 1
    HIGH= 'High'        //2
}

export interface UsersVote{
    user_id: string,
    stars: number
}

export interface UserSolution{
    user_id: string,
    solution: string
}

export interface IKata {

    name:string,
    description: string,
    level: KataLevel,
    intents: number, 
    stars: number,
    creator: string, //id of user
    solution: {
        solution: string,
        uSolutions: UserSolution[]
    },
     participants: {
        uv: UsersVote[]
    }
}