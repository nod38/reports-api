import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  value: string;
  @IsInt()
  timestamp: number;
}

export class CreateAttachmentDto {
  @IsNotEmpty()
  @IsString()
  file: string;
  @IsInt()
  timestamp: number;
}

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
}
