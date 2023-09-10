
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity('Email History')
export class EmailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderUsername: string;

  @Column()
  receiver: string;

  @Column()
  subject: string;

  @Column()
  message: string;


  @CreateDateColumn()
  sentAt: Date;

}