import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { paymentEntity } from "./payment.entity";




@Module({

    imports: [TypeOrmModule.forFeature([paymentEntity])],
    controllers: [],
    providers: []

})


export class paymentModule {}