import { Controller, Post, Body, Param, Patch, Get, ParseUUIDPipe } from '@nestjs/common';
import { CreateAnswerDto, CreateAttachmentDto, CreateReportDto } from './dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private service: ReportsService) {}

  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    return await this.service.storeReport(createReportDto);
  }

  @Post('/:id/answer')
  async createAnswer(
    @Body() createAnswerDto: CreateAnswerDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.service.storeAnswerToReport(id, createAnswerDto);
  }

  @Post('/:id/attachment')
  async createAttachment(
    @Body() createAttachmentDto: CreateAttachmentDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.service.storeAttachmentToReport(id, createAttachmentDto);
  }

  @Patch('/:id/commit')
  async commit(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.service.commitReport(id);
  }

  @Get('/:id/verify')
  async getHash(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.service.getReportHash(id);
  }
}
