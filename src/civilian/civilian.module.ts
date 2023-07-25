import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { serviceEntity } from "src/service/service.entity";
import { serviceProviderEntity } from "src/serviceProvider/serviceProvider.entity";
import { civilianController } from "./civilian.controller";
import { civilianEntity } from "./civilian.entity";
import { civilianService } from "./civilian.service";

@Module({
    imports: [TypeOrmModule.forFeature([civilianEntity, serviceProviderEntity, serviceEntity])],
    controllers: [civilianController],
    providers: [civilianService]
})

export class civilianModule {}