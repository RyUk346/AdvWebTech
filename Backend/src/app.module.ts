import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { civilianModule } from './civilian/civilian.module';
import { serviceModule } from './service/tourguide.module';
import { serviceProviderModule } from './serviceProvider/serviceProvider.module';


@Module({
  imports: [civilianModule, serviceModule, serviceProviderModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '181298',
      database: 'EmergencyHelpline',
      autoLoadEntities: true,
      synchronize: true,
    }
  )],
  controllers: [],
  providers: [],
})

export class AppModule {}
