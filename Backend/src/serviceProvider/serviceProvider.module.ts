import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { serviceProviderEntity } from "./serviceProvider.entity";

@Module({
    imports: [TypeOrmModule.forFeature([serviceProviderEntity])],
    controllers: [],
    providers: []
})

export class serviceProviderModule {}