import { Injectable } from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import Mail from 'nodemailer/lib/mailer';


@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}
    
    async sendApplicationConfirmation(studentEmail:string,studentName:string,jobTitle:string){
        await this.mailerService.sendMail({
            to:studentEmail,
            subject:`Application Received:${jobTitle}`,
            html:`<p>Hello ${studentName},</p><p>Your application for <strong>${jobTitle}</strong> has been successfuiily received!</p>`,
        })
     }
     async sendStatusUpdatedNotification(studentEmail:string, studentName:string,jobTitle:string,status:string){
        await this.mailerService.sendMail({
            to:studentEmail,
            subject:`Application Status update:${jobTitle}`,
            html:`<p>Hello ${studentName},</p><p>The status of your application for <strong>${jobTitle}</strong> has been updated to:<strong>${status}</strong>.</p>`,
        });
    } 
 }

