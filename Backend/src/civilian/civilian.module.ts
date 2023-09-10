import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { serviceEntity } from "src/service/service.entity";
import { serviceProviderEntity } from "src/serviceProvider/serviceProvider.entity";
import { civilianController } from "./civilian.controller";
import { civilianEntity } from "./civilian.entity";
import { civilianService } from "./civilian.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailEntity } from "./email-log.entity";
import { PaymentEntity } from "src/payment/payment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([civilianEntity, serviceProviderEntity, serviceEntity,EmailEntity,PaymentEntity]),MailerModule.forRoot(
        {
            transport: {
                host: 'smtp.gmail.com',
                port: 465,
                ignoreTLS: true,
                secure: true,
                auth: {
                    user: 'daruchinicheradip@gmail.com',
                    pass: 'nfzymfrzjbbdcpmi'
                }
            }
        }
    )],
    controllers: [civilianController],
    providers: [civilianService]
})

export class civilianModule {}