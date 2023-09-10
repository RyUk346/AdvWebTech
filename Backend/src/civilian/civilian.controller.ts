import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Res, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
//import session from "express-session";
import session = require("express-session");
import { diskStorage, MulterError } from "multer";
import { serviceDTO } from "src/service/service.dto";
import { serviceProviderRegDTO } from "src/serviceProvider/serviceProvider.dto";
import { civilianLoginDTO, civilianRegDTO, civilianUpdateDTO,CivilianMessageDTO} from "./civilian.dto";
import { civilianService } from "./civilian.service";
import { SessionGuard } from "./session.guard";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { serviceEntity } from "src/service/service.entity";
import { PaymentEntity } from "src/payment/payment.entity";
import { PaymentDTO } from "src/payment/payment.dto";
import { EmailEntity } from "./email-log.entity";


@Controller('civilian')
export class civilianController {
    constructor (private readonly civilianService:civilianService, 
        @InjectRepository(EmailEntity)
        private readonly emailLogRepository: Repository<EmailEntity>,
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
        ) {}


    
    @Post('signup')
    @UsePipes(new ValidationPipe())
    regcivilian (@Body() civilianRegInfo:civilianRegDTO) : any {
        console.log(civilianRegInfo);
        return this.civilianService.regcivilian(civilianRegInfo);
    }
    @Post('login')
    @UsePipes(new ValidationPipe())
    async logincivilian(@Body() civilianLoginInfo:civilianLoginDTO, @Session() session) {
        console.log(civilianLoginInfo);

        const result = await this.civilianService.logincivilian(civilianLoginInfo);

        if (result) {
            session.username = civilianLoginInfo.username;
            // return "Manager Login Successful!";
            // return session.username;
            console.log("login session username: " + session.username);
            // return result;
            return session.username;
        } else {
            return new NotFoundException({ message: "Civilian Not Found!" });
        }

        // if (await this.managerService.loginManager(managerLoginInfo)) {
        //     session.username = managerLoginInfo.username;
        //     return "Manager Login Successful!";
        // } else {
        //     return "Manager Login Failed!";
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
    @Get('search/serviceProvider/:serviceProviderId')
    @UseGuards(SessionGuard)
    getServiceProviderById(@Param('serviceProviderId', ParseIntPipe) serviceProviderId: number, @Session() session): any {
    return this.civilianService.getServiceProviderById(serviceProviderId, session.username);
}

    @Put('updateinfo')
    @UsePipes(new ValidationPipe())
   // @UseGuards(SessionGuard)
    updatecivilianInfo(@Body() civilianUpdateInfo:civilianUpdateDTO, @Session() session) : any {
        console.log(civilianUpdateInfo);
        return this.civilianService.updatecivilianInfo(civilianUpdateInfo, session.username);
    }

    @Delete('remove')
  // @UseGuards(SessionGuard)
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
    viewProfile (@Session() session) {
        return this.civilianService.viewProfile(session.username);
    }


    @Post('logout')
    // @UseGuards(SessionGuard)
    logoutManager(@Req() req) {
        if (req.session.destroy()) {
            console.log('Civilian Sign Out');
            return true;
        } else {
            throw new UnauthorizedException("Invalid Actions : Cannot Sign Out Civilian!");
        }
    }
   
   @Post('/addService')
    addService(@Body() service) {
        console.log(service);
        return this.civilianService.addService(service);
    }
    /*@Post('/addService')
    // @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    addService(@Body() serviceDetails: serviceDTO, @Session() session): any {
        console.log(serviceDetails);
        return this.civilianService.addService(serviceDetails, session.username);
    }*/
    @Delete('remove/service/:serviceId')
    // @UseGuards(SessionGuard)
    removeService(@Param('serviceId', ParseIntPipe) serviceId: number, @Session() session): any {
        return this.civilianService.removeService(serviceId, session.username);

        // return "Traveller Delete Successful!";
    }
    
    @Put('/updateservice/:id')
  @UsePipes(new ValidationPipe())
  updateServicebyid(
    @Body() mydto: serviceDTO,
    @Param('id', ParseIntPipe) id: any,
  ): any {
    return this.civilianService.updateServicebyid(mydto, id);
  }
  @Get('getAllServices')

  async getAllServices(@Session() session): Promise<serviceEntity[]> {

    return this.civilianService.getAllServices();

  }
  @Get('photo/:filename')
  async getCivilianPhoto(@Param('filename') filename: string, @Res() res) {
      return res.sendFile(filename, { root: './uploads' }); // Provide the correct path to the upload folder
  }



  @Get('photo')
  @UseGuards(SessionGuard)
  async getLoggedInCivilianPhoto(@Session() session, @Res() res) {
      const username = session.username;
      const filename = await this.civilianService.getCivilianPhotoFileName(username);

      if (filename) {
          return res.redirect(`/civilian/photo/${encodeURIComponent(filename)}`);
      } else {
          return "Something went wrong";
      }
  }

  @Post('sendmail/provider')
  @UseGuards(SessionGuard)
  sendMailToProvider (@Body() messageInfo:CivilianMessageDTO, @Session() session) {
      console.log(messageInfo);
      this.civilianService.sendMailToProvider(messageInfo, session.username);

      return "E-mail Send Successful!";
  }
  @Get('/emailHistory')
  @UseGuards(SessionGuard)
  viewEmails(@Session() session): Promise<EmailEntity[]> {
  return this.civilianService.viewEmails(session.username);
  }

  @Post('/makePayment')
  @UsePipes(new ValidationPipe())
  async makePayment(@Body() paymentInfo: PaymentDTO) {
    try {
      const result = await this.civilianService.makePayment(paymentInfo);
      return result; // Return a success message or appropriate response
    } catch (error) {
      return { error: 'Payment failed.' }; // Return an error response
    }
  }
}