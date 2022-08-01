import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Report } from './report.entity';

@Entity({ name: 'attachment' })
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  attachment_id: string;

  @Column({ type: 'varchar', length: 300 })
  file: string;

  @Column()
  timestamp: number;

  @ManyToOne(() => Report, (report) => report.report_id)
  @JoinColumn({
    name: 'report_id',
  })
  report: Report;
}
