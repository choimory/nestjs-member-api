import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { TSID } from 'tsid-ts';
import { CommonPageRequestDto } from '../common/dto/request/common-page.request.dto';
import { v7 as uuid } from 'uuid';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get(':id')
  async find(@Param('id', new ParseUUIDPipe()) id: string) {
    return 'id: ' + id + ', gen v7: ' + uuid();
  }

  @Get()
  async findAll(@Query() page: CommonPageRequestDto) {
    console.log('find all');
    console.log(page.page, page.size);
    return TSID.create().toString();
  }

  @Post()
  async join(@Body() payload: any) {
    return;
  }

  @Put(':id')
  async update(@Param(':id') id: string) {
    return;
  }

  @Delete(':id')
  async withdraw(@Param('id') id: string) {
    return;
  }
}
