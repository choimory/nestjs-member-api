import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonPageRequestDto } from '../common/dto/request/common-page.request.dto';
import { FindAllMemberRequestDto } from './dto/request/find-all.member.request.dto';
import { JoinMemberRequestDto } from './dto/request/join.member.request.dto';
import { UpdateMemberRequestDto } from './dto/request/update.member.request.dto';
import { CommonResponseDto } from '../common/dto/response/common.response.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly dataSource: DataSource,
  ) {}

  async find(id: string): Promise<CommonResponseDto> {
    const member: Member = await this.memberRepository.findOneOrFail({
      where: { id: id },
    });

    return new CommonResponseDto(HttpStatus.OK, HttpStatus[HttpStatus.OK], {
      id: member.id,
      nickname: member.nickname,
      email: member.email,
      image: member.image,
      introduce: member.introduce,
      createdAt: member.createdAt,
    });
  }

  async findAll(page: CommonPageRequestDto, param: FindAllMemberRequestDto) {
    return;
  }

  async join(payload: JoinMemberRequestDto) {
    return;
  }

  async update(id: string, payload: UpdateMemberRequestDto) {
    return;
  }

  async withdraw(id: string) {
    return;
  }
}
