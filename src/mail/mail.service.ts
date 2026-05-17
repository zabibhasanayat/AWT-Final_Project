import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {ConfigService} from '@nestjs/config';
import { sendMailDto } from '../dto/mail.dto';
import { SubjectTopologicalSorter } from 'typeorm/persistence/SubjectTopologicalSorter.js';
import { Subject } from 'rxjs';

@Injectable()
export class MailService {
    constructor(private readonly configService : ConfigService){}
    mailTransport(){
        const transporter =nodemailer.createTransport({host:this.configService.get<string>('EMAIL_HOST'),
            port:this.configService.get<number>('PORT'),
            secure:false,
            auth:{
                user:this.configService.get<string>('EMAIL_USER'),  
                pass:this.configService.get<string>('EMAIL_PASSWORD'),
            },
        })
        return transporter;
    }
    async sendMail(dto:sendMailDto){
        const {recipients,subject,html}=dto;
        const transport=this.mailTransport();
        const options : nodemailer.SendMailOptions={
            from:this.configService.get<string>('EMAIL_USER'),
            to:recipients,
            subject:subject,
            html:html,
        };

        try{
            await transport.sendMail(options);
            console.log('Email sent successfully');
        }
        catch(error){
            console.log('Error sending mail:',error);
        }
    }

} 
