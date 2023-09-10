import { civilianEntity } from "src/civilian/civilian.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('serviceProvider')
export class serviceProviderEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column({length:80, unique:true})
    username:string;
    @Column()
    email:string;
    @Column()
    contact:number;
    @Column()
    age:number;
    @Column()
    service:string;
    @Column({nullable:true})
    civilianID:number;

    @ManyToOne(() => civilianEntity, civilian => civilian.serviceProviders, {onDelete:"CASCADE"})
    @JoinColumn({name:'civilianID'})
        civilian:civilianEntity;
}
