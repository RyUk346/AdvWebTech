import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
//import session from "express-session";
import session = require("express-session");
import { diskStorage, MulterError } from "multer";
import { serviceDTO } from "src/service/service.dto";
import { serviceProviderRegDTO } from "src/serviceProvider/serviceProvider.dto";
import { civilianLoginDTO, civilianRegDTO, civilianUpdateDTO } from "./civilian.dto";
import { civilianService } from "./civilian.service";
import { SessionGuard } from "./session.guard";

@Controller('civilian')
export class civilianController {
    constructor (private readonly civilianService:civilianService) {}

    @Post('signup')
    @UsePipes(new ValidationPipe())
    regcivilian (@Body() civilianRegInfo:civilianRegDTO) : any {
        console.log(civilianRegInfo);
        return this.civilianService.regcivilian(civilianRegInfo);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async logincivilian (@Body() civilianLoginInfo:civilianLoginDTO, @Session() session) {
        console.log(civilianLoginInfo);

        //const x = await this.civilianService.logincivilian(civilianLoginInfo);
        if (await this.civilianService.logincivilian(civilianLoginInfo)) {
            //console.log(x);
            session.username = civilianLoginInfo.username;
            //console.log(session.username);
            return "civilian Login Successful!";
        } else {
            return "civilian Login Failed!";
        } 

        // if (this.civilianService.logincivilian(civilianLoginInfo)) {
        //     session.username = civilianLoginInfo.username;
        //     return true;
        // } else {
        //     return false;
        // }
    }

    @Put('upload')
    @UseGuards(SessionGuard)
    @UseInterceptors(FileInterceptor('image',
    {   
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
                cb(null, true);
            } else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 300000 },
        storage:diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            },
        })
    }))
    uploadcivilian(@UploadedFile() photoObj:Express.Multer.File, @Session() session) {
        console.log(photoObj.filename);
        const fileName = photoObj.filename;
        return this.civilianService.uploadcivilian(fileName, session.username);
    }


    @Get('search/serviceProvider')
    @UseGuards(SessionGuard)
    getserviceProviderBycivilianId (@Session() session) : any {
        return this.civilianService.getserviceProviderBycivilianId(session.username);
    }

    @Put('updateinfo')
    @UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    updatecivilianInfo(@Body() civilianUpdateInfo:civilianUpdateDTO, @Session() session) : any {
        console.log(civilianUpdateInfo);
        return this.civilianService.updatecivilianInfo(civilianUpdateInfo, session.username);
    }

    @Delete('remove')
    @UseGuards(SessionGuard)
    removecivilian(@Session() session) : any {
        return this.civilianService.removecivilian(session.username);
    }
    
    @Delete('remove/serviceProvider/:serviceProviderId')
    @UseGuards(SessionGuard)
    removeserviceProvider(@Param('serviceProviderId', ParseIntPipe) serviceProviderId:number, @Session() session) : any {
        return this.civilianService.removeserviceProvider(serviceProviderId, session.username);
    }
    @Post('regserviceProvider')
    @UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    regserviceProvider(@Body() serviceProviderRegInfo:serviceProviderRegDTO, @Session() session) {
        console.log(serviceProviderRegInfo);
        return this.civilianService.regserviceProvider(serviceProviderRegInfo, session.username);
    }


   /* @Post('addService')
    @UsePipes(new ValidationPipe())
    regservice(@Body() serviceInfo:serviceDTO) : any {
        console.log(serviceInfo);
        return this.civilianService.regservice(serviceInfo);
    }*/




    @Get('/profile')
    @UseGuards(SessionGuard)
    viewProfile (@Session() session) : any {
        return this.civilianService.viewProfile(session.username);
    }

    @Get('/signout')

    Logout(@Session() session)

    {
        if(session.destroy())

        {
            return {message: "Log out"};
        }

        else
        {
            throw new UnauthorizedException("Invalid action");
        }
    

    }
}