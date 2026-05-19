import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto'; // Fixed the directory path here
import { User } from '../users/entities/user.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto, company: { id: string; email: string; role: string }): Promise<Job> {
    const job = this.jobsRepository.create({
      ...createJobDto,
      company: { id: company.id } as User,
    });
    return this.jobsRepository.save(job);
  }

  async findAll(companyId?: string, role?: string): Promise<Job[]> {
    const query = this.jobsRepository.createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company');
    
    if (companyId) {
      query.andWhere('company.id = :companyId', { companyId });
    }
    if (role) {
      query.andWhere('job.title ILIKE :role', { role: `%${role}%` });
    }
    return query.getMany();
  }

  async remove(id: string): Promise<void> {
    const result = await this.jobsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Job posting with ID ${id} not found.`);
    }
  }
}