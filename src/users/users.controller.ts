import { Controller, Get, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole } from './entities/user.entity';

// Explicitly type the authenticated request payload coming from Passport JWT
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current logged-in user profile details' })
  async getProfile(@Request() req: AuthenticatedRequest) { // Explicit type explicitly applied here
    const user = await this.usersService.findById(req.user.id);
    if (!user) {
      throw new NotFoundException('User profile data context not found.');
    }
    delete user.password;
    return user;
  }

  @Get('companies/:id')
  @ApiOperation({ summary: 'Get corporate profile overview, ratings, and active job count' })
  async getCompanyProfile(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    
    if (!user || user.role !== UserRole.COMPANY) {
      throw new NotFoundException(`Company registry record with ID "${id}" not found.`);
    }

    delete user.password;
    
    return {
      id: user.id,
      companyName: user.fullName,
      department: user.department,
      activeJobCount: user.postedJobs ? user.postedJobs.length : 0,
      reviews: [], 
    };
  }
}