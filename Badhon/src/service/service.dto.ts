import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class serviceDTO {
    id:number;

    @IsNotEmpty()
    username:string;
    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    servicetype:string;

    @IsInt({message: "Invalid Contact!"})
    @IsNotEmpty({message: "Contact Must be Filled!"})
    contact:number;

    @IsString({message: "Invalid Location"})
    @IsNotEmpty({message: "Location Must be Filled!"})
    location:string;

    usefullinks:string;
    civilianID:number;
}