import { Controller ,Body ,Post} from '@nestjs/common';
import {MailService} from './mail.service'; 
import { sendMailDto } from '../dto/mail.dto';
@Controller('mail')
export class MailController {
    constructor(private readonly mailService:MailService){}
    @Post('send')
    async sendMail(@Body()dto:sendMailDto){
        await this.mailService.sendMail(dto);
        return{message: 'Email sent successfully'};
    }
}
 