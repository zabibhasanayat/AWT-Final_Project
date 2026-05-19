import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Application } from './entities/application.entity';
import { MailModule } from '../mail/mail.module'; // 👈 Import the module here

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    MailModule, // 👈 CRITICAL: This allows Nest to resolve MailService at index [1]
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}