import { User } from "../../../core/models/types";

export interface ProductResponse {  
    name: string;  
    description: string; 
    price: number; 
    imageUrl:string;
    user: User;  
  } 