import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments') // Specify the table name if different from the entity name
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentAmount: number;

  @Column()
  paymentMethod: string;

  @Column({ nullable: true })
  mobileNumber: string;

  @Column({ nullable: true })
  bankName: string;

  @Column({ nullable: true })
  cardNumber: string;
}
