import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ example: 'Software Engineer Intern' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Looking for a skilled backend CSE student...' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 'Backend development' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({ example: '25,000 BDT', required: false })
  @IsString()
  @IsOptional()
  salary?: string;

  @ApiProperty({ example: 'Dhaka, Bangladesh' })
  @IsString()
  @IsNotEmpty()
  location!: string;
}