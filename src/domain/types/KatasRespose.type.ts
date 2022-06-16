import { IKatas} from "../interfaces/IKatas.interface"

export type KatasResponse = {
    katas : IKatas[];
    totalPages: number,
    currentPage: number
}