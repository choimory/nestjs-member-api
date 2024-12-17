import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonPageRequestDto } from '../common/dto/request/common-page.request.dto';
import { FindAllMemberRequestDto } from './dto/request/find-all.member.request.dto';
import { JoinMemberRequestDto } from './dto/request/join.member.request.dto';
import { UpdateMemberRequestDto } from './dto/request/update.member.request.dto';
import { CommonResponseDto } from '../common/dto/response/common.response.dto';
import * as bcrypt from 'bcrypt';
import { MemberSuspension } from './entities/member-suspension.entity';
import { v7 as uuid} from 'uuid';

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
    const memberSuspension: Partial<MemberSuspension> = {};

    return;
  }

  async join(payload: JoinMemberRequestDto): Promise<CommonResponseDto> {
    // bcrypt
    const hashed: string = await bcrypt.hash(
      payload.password,
      await bcrypt.genSalt(),
    );

    // payload to entity
    const member: Partial<Member> = {
      id: uuid(),
      email: payload.email,
      nickname: payload.nickname,
      password: hashed,
    };

    // transaction and save
    return await this.dataSource.transaction(async (manager) => {
      const result: Partial<Member> = await manager.save(Member, member);

      // return
      return new CommonResponseDto(
        HttpStatus.CREATED,
        HttpStatus[HttpStatus.CREATED],
        { id: result.id, nickname: result.nickname, email: result.email },
      );
    });
  }

  async update(id: string, payload: UpdateMemberRequestDto) {
    return;
  }

  async withdraw(id: string) {
    return;
  }
}
