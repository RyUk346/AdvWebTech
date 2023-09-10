import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { serviceEntity } from "./service.entity";

@Module({
    imports:[TypeOrmModule.forFeature([serviceEntity])],
    controllers:[],
    providers:[]
})

export class serviceModule {}