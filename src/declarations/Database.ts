import { Models } from 'appwrite'

export interface PersonalProduct extends Models.Document {
    name: string
    brand:string
    description: string
    price: number
    active: boolean
    discount:boolean
    imageId:string
}

export type MyProducts = {
    total: number
    documents: [PersonalProduct]
}