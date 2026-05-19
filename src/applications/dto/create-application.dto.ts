import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ example: 'job-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  jobId!: string; // Added ! operator
}