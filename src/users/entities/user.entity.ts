import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Job } from '../../jobs/entities/job.entity';
import { Application } from '../../applications/entities/application.entity';

export enum UserRole {
  STUDENT = 'Student',
  COMPANY = 'Company',
  ADMIN = 'Admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // Added definite assignment operator

  @Column({ unique: true })
  email!: string;

  @Column()
  password?: string; // Optional field, doesn't throw strict error if handling undefined hashes

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
  role!: UserRole;

  @Column()
  fullName!: string;

  @Column({ nullable: true })
  department?: string; // Added optional flag or use string | null

  // One User (Company) -> Many Jobs
  @OneToMany(() => Job, (job) => job.company)
  postedJobs!: Job[];

  // Many Applications -> One Student
  @OneToMany(() => Application, (app) => app.student)
  applications!: Application[];

  // Many Jobs Many Users (Students) via Saved Jobs
  @ManyToMany(() => Job, (job) => job.savedByStudents)
  @JoinTable({
    name: 'saved_jobs',
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'job_id', referencedColumnName: 'id' },
  })
  savedJobs!: Job[];
}