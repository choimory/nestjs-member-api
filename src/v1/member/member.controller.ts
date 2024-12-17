import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CommonPageRequestDto } from '../common/dto/request/common-page.request.dto';
import { FindAllMemberRequestDto } from './dto/request/find-all.member.request.dto';
import { JoinMemberRequestDto } from './dto/request/join.member.request.dto';
import { UpdateMemberRequestDto } from './dto/request/update.member.request.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get(':id')
  async find(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.memberService.find(id);
  }

  @Get()
  async findAll(
    @Query() page: CommonPageRequestDto,
    @Query() param: FindAllMemberRequestDto,
  ) {
    return;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async join(@Body() payload: JoinMemberRequestDto) {
    return this.memberService.join(payload);
  }

  @Put()
  async update(@Body() payload: UpdateMemberRequestDto) {
    return;
  }

  @Delete()
  async withdraw() {
    return;
  }

  @Post('login')
  async login() {
    return;
  }
}
