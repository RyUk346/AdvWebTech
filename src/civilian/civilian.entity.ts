import { serviceEntity } from "src/service/service.entity";
import { serviceProviderEntity } from "src/serviceProvider/serviceProvider.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

// @Entity('civilian_Info')
// export class civilianInfoEntity {
//     @PrimaryColumn()
//     id:number;
//     @Column()
//     name:string;
//     @Column()
//     email:string;
//     @Column()
//     contact:number;

//     @ManyToMany(() => serviceEntity, service => service.civilianinfos)
//     @JoinTable(
//         {
//             name:'civilian_service',
//             joinColumn: {
//                 name:'civilianID',
//                 referencedColumnName: 'id'
//             },
//         }
//     )
//     services: serviceEntity[];
// }

@Entity('civilian')
export class civilianEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({length:150})
    name:string;
    @Column({length:80, unique:true})
    username:string;
    @Column()
    email:string;
    @Column()
    contact:number;
    @Column()
    password:string;
    @Column({nullable:true})
    photoFileName:string;

    @OneToMany(() => serviceProviderEntity, serviceProvider => serviceProvider.civilian, {cascade: ["remove"]})
        serviceProviders:serviceProviderEntity[];
    
  @ManyToMany(() => serviceEntity, service => service.civilians)
        @JoinTable(
            {
                name:'civilian_service',
                joinColumn: {
                    name:'civilianID',
                    referencedColumnName: 'id'
                },
            }
        )
        services: serviceEntity[];

    
    // @OneToOne(() => civilianInfoEntity, {eager:true})
    //     civilianInfo:civilianInfoEntity;
}

@Entity('civilianProfile')
export class civilianProfileEntity {
    id:number;

    @Column()
    username:string;

    @Column()
    email:string;

    @Column()
    contact:number;
}
