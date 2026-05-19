import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'; // Added CreateDateColumn import
import { User } from '../../users/entities/user.entity';
import { Job } from '../../jobs/entities/job.entity';

export enum ApplicationStatus {
  PENDING = 'Pending',
  INTERVIEW = 'Interview',
  HIRED = 'Hired',
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // Added ! operator

  @CreateDateColumn()
  appliedAt!: Date; // Added ! operator

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.PENDING })
  status!: ApplicationStatus; // Added ! operator

  // Many Applications -> One Student
  @ManyToOne(() => User, (user) => user.applications, { onDelete: 'CASCADE' })
  student!: User; // Added ! operator

  // Many Applications -> One Job
  @ManyToOne(() => Job, (job) => job.applications, { onDelete: 'CASCADE' })
  job!: Job; // Added ! operator
}