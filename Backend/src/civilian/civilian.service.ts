import { Inject, Injectable,Session,NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { serviceProviderRegDTO } from "src/serviceProvider/serviceProvider.dto";
import { serviceProviderEntity } from "src/serviceProvider/serviceProvider.entity";
import { Repository } from "typeorm";
import { DeleteQry, civilianInfoDTO, CivilianMessageDTO, civilianLoginDTO, civilianRegDTO, civilianUpdateDTO } from "./civilian.dto";
import { civilianEntity, civilianProfileEntity } from "./civilian.entity";
import * as bcrypt from 'bcrypt';
import { PaymentDTO } from "src/payment/payment.dto";
import { serviceDTO } from "src/service/service.dto";
import { serviceEntity } from "src/service/service.entity";
import { EmailEntity } from "./email-log.entity";
import { PaymentEntity } from "src/payment/payment.entity";
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class civilianService {
    constructor (
        @InjectRepository(civilianEntity)
            private civilianRepo:Repository<civilianEntity>,
        @InjectRepository(serviceProviderEntity)
            private serviceProviderRepo:Repository<serviceProviderEntity>,
        @InjectRepository(serviceEntity)
            private serviceRepo:Repository<serviceEntity>,
            private readonly mailerService: MailerService,
        @InjectRepository(EmailEntity)
        private readonly EmailRepo: Repository<EmailEntity>,
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
      ) {}
        // @InjectRepository(civilianInfoEntity)
        //     private civilianInfoRepo:Repository<civilianInfoEntity>
    

    async regcivilian (civilianRegInfo:civilianRegDTO) : Promise<civilianEntity> {
        const salt = await bcrypt.genSalt();
        civilianRegInfo.password = await bcrypt.hash(civilianRegInfo.password, salt);

        return this.civilianRepo.save(civilianRegInfo);
        //await this.addcivilianInfo(civilianRegInfo);

        //return "civilian Registered!";

        // const civilian = await this.civilianRepo.findOneBy({username:civilianRegInfo.username});
        // var civilianInfo:civilianInfoDTO;
        // civilianInfo.id = civilian.id;
        // civilianInfo.name = civilianRegInfo.name;
        // civilianInfo.email = civilianRegInfo.email;
        // civilianInfo.contact = civilianRegInfo.contact;
        // await this.civilianInfoRepo.save(civilianInfo);

        // return civilianRegInfo;
    }

    // async addcivilianInfo (civilianRegInfo:civilianRegDTO) {
    //     //var civilianInfo:civilianInfoDTO = null;
    //     const civilianInformation = new civilianInfoEntity;
    //     const civilian = await this.civilianRepo.findOneBy({username:civilianRegInfo.username});
    //     const civilianId = civilian.id;

    //     civilianInformation.id = civilianId;
    //     civilianInformation.name = civilianRegInfo.name;
    //     civilianInformation.email = civilianRegInfo.email;
    //     civilianInformation.contact = civilianRegInfo.contact;
    //     return this.civilianInfoRepo.save(civilianInformation);
    // }

    async logincivilian (civilianLoginInfo:civilianLoginDTO) {
        const civilian = await this.civilianRepo.findOneBy({username:civilianLoginInfo.username});
        
        if (civilian !=null){
        const isMatch:boolean = await bcrypt.compare(civilianLoginInfo.password, civilian.password);
        console.log(isMatch);
        return isMatch;
        }else{
            return false;
        }

        // if(civilian) {
        //     const isMatch:boolean = await bcrypt.compare(civilianLoginInfo.password, civilian.password);
        //     if (isMatch) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
        // return false;
    }
    

      
      async removeService(serviceId: number, civilianUsername: string) {
        const service = await this.serviceRepo.findOneBy({ id: serviceId });
        const civilian = await this.civilianRepo.findOneBy({ username: civilianUsername });


        if (service.id == serviceId) {
            await this.serviceRepo.delete(serviceId);
            return "service Deleted!";
        } else {
            return "Couldn't Delete!";
        }
    }
    
    

    async uploadcivilian (fileName:string, username:string) {
        const civilian = await this.civilianRepo.findOneBy({username:username});
        console.log(username);
        if (civilian) {
            civilian.photoFileName = fileName;
            await this.civilianRepo.save(civilian);
            return "civilian Photo Uploaded!";
        }
        return "civilian Photo Couldn't be Uploaded!";
    }

    async regserviceProvider (serviceProviderRegInfo:serviceProviderRegDTO, civilianUsername:string) : Promise<serviceProviderEntity> {
        const civilian = await this.civilianRepo.findOneBy({username:civilianUsername});
        //const serviceProvider = await this.serviceProviderRepo.findOneBy({username:travelerRegInfo.username});

        serviceProviderRegInfo.civilianID = civilian.id;

        return this.serviceProviderRepo.save(serviceProviderRegInfo);
    }

    // getTravelerBycivilianId (civilianId:number) : Promise<civilianEntity[]> {
    //     return this.civilianRepo.find(
    //         {
    //             where: {id:civilianId},
    //             relations: {serviceProviders:true}
    //         }
    //     )
    // }

    async getserviceProviderBycivilianId (civilianUsername:string) {
        console.log(civilianUsername);
        const civilian = await this.civilianRepo.findOneBy({username:civilianUsername});
        const civilianId = civilian.id;

        return this.civilianRepo.find(
            {
                where: {id:civilianId},
                relations: {serviceProviders:true}
            }
        ) 
    }

    async updatecivilianInfo (civilianUpdateInfo:civilianUpdateDTO, civilianUsername:string) : Promise<civilianEntity> {
        const civilian = await this.civilianRepo.findOneBy({username:civilianUsername});
        civilianUpdateInfo.id = civilian.id;

        const salt = await bcrypt.genSalt();
        civilianUpdateInfo.password = await bcrypt.hash(civilianUpdateInfo.password, salt);

        await this.civilianRepo.update({id:civilian.id}, civilianUpdateInfo);
        console.log("update!");
        return this.civilianRepo.findOneBy({id:civilian.id});
    }

    async removecivilian (civilianUsername:string) {
        const civilian = await this.civilianRepo.findOneBy({username:civilianUsername});
        await this.civilianRepo.delete(civilian.id);
    }

    // async removeTraveler (civilianData:civilianEntity, travelerId:number) : Promise<void> {
    //     const traveler = await this.travelerRepo.findOneBy({id:travelerId})
    //     if (traveler.civilian.id !== civilianData.id) {
    //         throw new NotFoundException('this civilian is not associated with the traveler!');
    //     } else {
    //         await this.travelerRepo.delete(travelerId);
    //     }
    // }

    async removeserviceProvider (serviceProviderId:number, civilianUsername:string) {
        // const civilian = await this.civilianRepo.findOneBy({username:civilianUsername});
        // const civilianId = civilian.id;
        
        // const serviceProviders = await this.civilianRepo.find(
        //     {
        //         where: {id:civilianId},
        //         relations: {serviceProviders:true}
        //     }
        // );

        // //const traveler = await this.serviceProviderRepo.findOneBy({id:travelerId});

        // if ( !== civilianId) {
        //     throw new NotFoundException('this civilian is not associated with the traveler!');
        // } else {
        //     await this.serviceProviderRepo.delete(travelerId);
        // }

        const serviceProvider = await this.serviceProviderRepo.findOneBy({id:serviceProviderId});
        const civilian = await this.civilianRepo.findOneBy({username:civilianUsername});
        const civilianId = civilian.id;

        if (serviceProvider.civilianID == civilianId) {
            await this.serviceProviderRepo.delete(serviceProviderId);
            return "serviceProvider Deleted!";
        } else {
            return "Couldn't Delete!";
        }
    }

    async regservice (serviceRegInfo:serviceDTO) : Promise<serviceEntity> {


        return this.serviceRepo.save(serviceRegInfo);
    }

    async viewProfile (civilianUsername:string) {
        console.log(civilianUsername);
        const civilian = await this.civilianRepo.findOneBy({username:civilianUsername});

        if (civilian) {
            const { name, email, contact } = civilian;
            return { name, email, contact };
        }
        return "Civilian not found!";

    }
    async addService(service): Promise<serviceEntity> {
        return this.serviceRepo.save(service);
    }
    /*async addService(serviceDetails: serviceDTO, civilianUsername: string) {
        const civilian = await this.civilianRepo.findOneBy({ username: civilianUsername });
        serviceDetails.civilianId = civilian.id;
        return this.civilianRepo.save(serviceDetails);
    }*/


    updateServicebyid(mydto:serviceDTO,id):any {
        return this.serviceRepo.update(id,mydto);
           }       
           async getAllServices(): Promise<serviceEntity[]> {
            return this.serviceRepo.find();
    
          }
          async getCivilianPhotoFileName(username: string): Promise<string | null> {
            const provider = await this.civilianRepo.findOneBy({ username });
            if (provider && provider.photoFileName) {
                return provider.photoFileName;
            }
            return null;
        }

        async sendMailToProvider(messageInfo: CivilianMessageDTO, civilianUsername: string) {
            const civilian = await this.civilianRepo.findOneBy({ username: civilianUsername });
    
           
            await this.mailerService.sendMail({
              to: messageInfo.receiver,
              subject: 'Provider ' + civilian.name + ' : ' + messageInfo.subject,
              text: messageInfo.message,
            });
        
            // Save the email log to the database
            const emailLog = this.EmailRepo.create({
              senderUsername: civilianUsername,
              receiver: messageInfo.receiver,
              subject: messageInfo.subject,
              message: messageInfo.message,
            });
            await this.EmailRepo.save(emailLog);
    
            
          }


          async viewEmails(civilianUsername: string): Promise<EmailEntity[]> {
            return this.EmailRepo.find({
              where: {
                senderUsername: civilianUsername,
              },
              order: {
                sentAt: 'DESC', // You can change the sorting order as needed
              },
            });
          }
          async makePayment(paymentInfo: PaymentDTO): Promise<any> {
            // Create a new PaymentEntity instance using the DTO data
            const paymentRecord = this.paymentRepository.create({
              paymentAmount: paymentInfo.paymentAmount,
              paymentMethod: paymentInfo.paymentMethod,
              mobileNumber: paymentInfo.mobileNumber,
              bankName: paymentInfo.bankName,
              cardNumber: paymentInfo.cardNumber,
              // Set other properties as needed
            });
        
            // Save the payment record in the database
            await this.paymentRepository.save(paymentRecord);
        
            return {
              message: `Payment of ৳${paymentInfo.paymentAmount} successfully processed.`,
            };
          }
          async getServiceProviderById(serviceProviderId: number, civilianUsername: string) {
            console.log(civilianUsername);
            
            const civilian = await this.civilianRepo.findOneBy({ username: civilianUsername });
            
            if (!civilian) {
                return null; // Provider not found
            }
            const serviceProvider = await this.serviceProviderRepo.findOne({
                where: {
                    id: serviceProviderId,
                    civilian: civilian
                }
            });
        
            return serviceProvider; // Returns null if Civilian with specified ID is not associated with the provider
        }

}