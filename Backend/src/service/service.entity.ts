import { civilianEntity } from "src/civilian/civilian.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('service')
export class serviceEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    servicetype:string;
    @Column()
    contact:number;

    @Column()
    location:string;
    @Column()
    details:string;

    @ManyToMany(() => civilianEntity, civilian => civilian.services)
    civilians: civilianEntity[];
}