import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
//import { MailController } from './mail.controller';

@Module({
  //controllers: [MailController],
  providers: [MailService],
  exports: [MailService], // 👈 CRITICAL: This exposes the service to the outside world
})
export class MailModule {}