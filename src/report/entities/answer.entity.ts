import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Report } from './report.entity';

@Entity({ name: 'answer' })
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  answer_id: string;

  @Column({ type: 'varchar', length: 300 })
  value: string;

  @Column()
  timestamp: number;

  @ManyToOne(() => Report, (report) => report.report_id)
  @JoinColumn({
    name: 'report_id',
  })
  report: Report;
}
