import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Application } from '../../applications/entities/application.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  category!: string;

  @Column({ nullable: true })
  salary?: string;

  @Column() // Fixed uppercase Column
  location!: string;

  @ManyToOne(() => User, (user) => user.postedJobs, { onDelete: 'CASCADE' })
  company!: User;

  @OneToMany(() => Application, (app) => app.job)
  applications!: Application[];

  @ManyToMany(() => User, (user) => user.savedJobs)
  savedByStudents!: User[];
}