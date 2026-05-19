import { Controller, Post, Get, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

// Define a structured interface for passport-authenticated requests
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}

@ApiTags('Applications')
@Controller('applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Student applies for a job listing (Prevents duplicates)' })
  apply(@Body() createApplicationDto: CreateApplicationDto, @Request() req: AuthenticatedRequest) {
    return this.applicationsService.apply(createApplicationDto.jobId, req.user);
  }

  @Get('my')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'View logged-in student application history context' })
  findMyApps(@Request() req: AuthenticatedRequest) {
    return this.applicationsService.findMyApplications(req.user.id);
  }

  @Patch(':id')
  @Roles(UserRole.COMPANY, UserRole.ADMIN)
  @ApiOperation({ summary: 'Company HR processes and updates an application status phase' })
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.applicationsService.updateStatus(id, updateStatusDto.status);
  }
}