import { IsString, Matches } from "class-validator";





export class paymentDTO {

    id:number;

    

    @IsString({message: "Invalid Name"})

    @Matches(/^[a-zA-Z0-9@._$]+$/, {message:"Use Valid Username Format"})

    username:string;

   

    payment:string;




   

}