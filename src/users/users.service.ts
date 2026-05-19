import { Injectable ,ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import{Repository} from 'typeorm';
import{User} from './entities/user.entity';
import{CreateUserDto} from './dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository:Repository<User>, 
    ){}

    async create(createUserDto:CreateUserDto):Promise<User>{
        const existingUser=await this.usersRepository.findOne({where:{email:createUserDto.email}});
        if(existingUser){
            throw new ConflictException('Email is already registered in the system.');
        }
        const user= this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }
async findById(id: string): Promise<User | null> { 
  return this.usersRepository.findOne({ where: { id }, relations: ['postedJobs', 'applications'] });
}

    async findByEmail(email:string):Promise<User|null>{
        return this.usersRepository.findOne({where:{email}});
    }
}
