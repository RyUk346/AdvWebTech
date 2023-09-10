import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class serviceDTO {
    id:number;

    //@IsNotEmpty()
    //username:string;
    servicetype:string;
    contact:number;
    location:string;
    details:string;
    
   // usefullinks:string;
   // civilianID:number;
}