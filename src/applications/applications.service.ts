import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from './entities/application.entity';
import { MailService } from '../mail/mail.service';
import { User } from '../users/entities/user.entity';
import { Job } from '../jobs/entities/job.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private appRepository: Repository<Application>,
    private mailService: MailService,
  ) {}

  async apply(jobId: string, student: any): Promise<Application> {
    // 1. Prevent duplicate applications checking database records
    const existingApp = await this.appRepository.findOne({
      where: { job: { id: jobId }, student: { id: student.id } },
    });
    if (existingApp) {
      throw new ConflictException('You have already submitted an application for this job opening.');
    }

    const application = this.appRepository.create({
      job: { id: jobId } as Job,
      student: { id: student.id } as User,
    });

    const savedApp = await this.appRepository.save(application);
    
    // Fetch full data context for sending emails safely
    const detailedApp = await this.appRepository.findOne({
      where: { id: savedApp.id },
      relations: ['student', 'job'],
    });

    // Mandatory Email Trigger 1: Application Receipt Notification
    if (detailedApp) {
      await this.mailService.sendApplicationConfirmation(
        detailedApp.student.email,
        detailedApp.student.fullName,
        detailedApp.job.title,
      );
    }

    return savedApp;
  }

  async findMyApplications(studentId: string): Promise<Application[]> {
    return this.appRepository.find({
      where: { student: { id: studentId } },
      relations: ['job', 'job.company'],
    });
  }

  async updateStatus(id: string, status: ApplicationStatus): Promise<Application> {
    const application = await this.appRepository.findOne({
      where: { id },
      relations: ['student', 'job'],
    });
    if (!application) throw new NotFoundException('Application registry record not found.');

    application.status = status;
    const updatedApp = await this.appRepository.save(application);

    // Mandatory Email Trigger 2: Review Processing Update Status Notification
    // Fix the method name to include the 'd' to match your mail.service.ts definition
await this.mailService.sendStatusUpdatedNotification(
  updatedApp.student.email, // Also fixed if user entity email matches
  updatedApp.student.fullName,
  updatedApp.job.title,
  updatedApp.status,
);

    return updatedApp;
  }
}