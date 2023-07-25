import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";

import { civilianEntity } from "src/civilian/civilian.entity";
import { Civilian } from "src/civilian/civilian.service";




@Entity("payment Information")

export class paymentEntity {

  @PrimaryGeneratedColumn()

  id: number;




  @Column({length:80, unique:true})

  username:string;




  @Column()

  payment: string;
  @OneToOne(() => civilianEntity, civilian => civilian.payment)

  civilian: civilianEntity;




  

}