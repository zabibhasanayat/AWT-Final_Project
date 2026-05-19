import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../entities/application.entity';

export class UpdateStatusDto {
  @ApiProperty({ example: 'Interview', enum: ApplicationStatus })
  @IsEnum(ApplicationStatus)
  @IsNotEmpty()
  status!: ApplicationStatus; // Added ! operator
}