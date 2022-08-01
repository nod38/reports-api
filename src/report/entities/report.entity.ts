import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Answer } from './answer.entity';
import { Attachment } from './attachment.entity';

@Entity({ name: 'report' })
export class Report {
  @PrimaryGeneratedColumn('uuid')
  report_id: string;

  @Column({ type: 'varchar', length: 300 })
  firstName: string;

  @Column({ type: 'varchar', length: 300 })
  lastName: string;

  @Column({ type: 'boolean', default: false })
  upload_finished: boolean;

  @OneToMany(() => Answer, (answer) => answer.report, {
    cascade: true,
  })
  answers: Answer[];

  @OneToMany(() => Attachment, (attachment) => attachment.report, {
    cascade: true,
  })
  attachments: Attachment[];
}
