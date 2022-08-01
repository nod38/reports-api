import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto, CreateAttachmentDto, CreateReportDto } from './dto';
import { Attachment } from './entities/attachment.entity';
import * as hash from 'object-hash';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepo: Repository<Report>,
  ) {}

  public async getAll() {
    return await this.reportsRepo.find({});
  }

  public async storeReport(createReportDto: CreateReportDto) {
    return this.reportsRepo.save(createReportDto);
  }

  public async storeAnswerToReport(reportId: string, createAnswerDto: CreateAnswerDto) {
    const report = await this.reportsRepo.findOne({
      relations: ['answers'],
      where: { report_id: reportId },
    });

    if (!report) {
      throw new NotFoundException({ message: 'Report not found.' });
    }

    const answer = new Answer();
    answer.value = createAnswerDto.value;
    answer.timestamp = createAnswerDto.timestamp;

    report.answers.push(answer);

    return await this.reportsRepo.save(report);
  }

  public async storeAttachmentToReport(reportId: string, createAttachmentDto: CreateAttachmentDto) {
    const report = await this.reportsRepo.findOne({
      relations: ['attachments'],
      where: { report_id: reportId },
    });

    if (!report) {
      throw new NotFoundException({ message: 'Report not found.' });
    }

    const attachment = new Attachment();
    attachment.file = createAttachmentDto.file;
    attachment.timestamp = createAttachmentDto.timestamp;

    report.attachments.push(attachment);

    return await this.reportsRepo.save(report);
  }

  public async commitReport(reportId: string) {
    const report = await this.reportsRepo.findOneBy({ report_id: reportId });

    if (!report) {
      throw new NotFoundException({ message: 'Report not found.' });
    }

    report.upload_finished = true;

    return await this.reportsRepo.save(report);
  }

  public async getReportHash(reportId: string) {
    const report = await this.reportsRepo.findOne({
      relations: ['answers', 'attachments'],
      where: { report_id: reportId },
      order: {
        answers: {
          timestamp: 'ASC',
        },
        attachments: {
          timestamp: 'ASC',
        },
      },
    });

    const answersValues = report.answers.map((answer) => answer.value);
    const attachmentsValues = report.attachments.map((attachment) => attachment.file);

    const reportHash = hash({
      answers: answersValues,
      attachments: attachmentsValues,
    });

    return { hash: reportHash };
  }
}
