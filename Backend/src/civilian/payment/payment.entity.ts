import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";







@Entity("payment Information")

export class paymentEntity {

  @PrimaryGeneratedColumn()

  id: number;




  @Column({length:80, unique:true})

  username:string;








  

}