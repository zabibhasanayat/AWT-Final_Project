import{IsEmail,IsString,IsEmpty, IsNotEmpty} from 'class-validator';
import{ApiProperty} from '@nestjs/swagger';

export class LoginDto{
    @ApiProperty({example :'student@cse.du.ac.bd'})
    @IsEmail()
    email:string;

    @ApiProperty({example:'SecurePassword123'})
    @IsString()
    @IsNotEmpty()
    password:string;
}
