import { IsInt, IsNotEmpty, IsString,IsOptional, MaxLength } from 'class-validator';

export class PaymentDTO {
 @IsOptional()
  @IsInt()
  paymentAmount: number;

  @IsOptional()
  @IsString()
  paymentMethod: 'mobileBanking' | 'bankingCard';
  @IsOptional()
  @IsString()
  mobileNumber: string;
  @IsOptional()
  @IsString()
  bankName: string;
  @IsOptional()
  @IsString()
  cardNumber: string;
}
