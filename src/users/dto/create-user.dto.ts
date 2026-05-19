import{ IsEmail ,IsNotEmpty,IsEnum,IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {UserRole} from '../entities/user.entity';

export class CreateUserDto{
    @ApiProperty({example:'student@cse.du.ac.bd'})
    @IsEmail()
    email:string;

    @ApiProperty({example:'SecurePassword123'})
    @IsString()
    @IsNotEmpty()
    password:string;

    @ApiProperty({example:'stdduent',enum:UserRole})
    @IsEnum(UserRole)
    role:UserRole;

    @ApiProperty({example:'Tamim Iqbal'})
    @IsString()
    @IsNotEmpty()
    fullName:string;

    @ApiProperty({example:'CSE',required:false})
    @IsString()
    @IsOptional()
    department?:string;
}
