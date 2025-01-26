import { Models } from 'appwrite'

export interface PersonalProduct extends Models.Document {
    $id: string;
    name: string;
    brand: string;
    price: number;
    description: string;
    active: boolean;
    discount: boolean;
    imageId?: string;
}

export type MyProducts = {
    total: number
    documents: [PersonalProduct]
}