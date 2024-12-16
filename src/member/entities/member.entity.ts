import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CommonTime } from '../../common/entities/common-time.entity';
import { v7 as uuid } from 'uuid';
import { MemberSuspension } from './member-suspension.entity';

@Entity()
export class Member extends CommonTime {
  @PrimaryColumn('uuid')
  id?: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  nickname: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  introduce?: string;

  @OneToMany(
    () => MemberSuspension,
    (memberSuspension) => memberSuspension.member,
  )
  memberSuspension?: MemberSuspension;

  constructor(
    email: string,
    nickname: string,
    password: string,
    id?: string,
    image?: string,
    introduce?: string,
    memberSuspension?: MemberSuspension,
    createdAt?: Date,
    modifiedAt?: Date,
    deletedAt?: Date,
  ) {
    super(createdAt, modifiedAt, deletedAt);
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.password = password;
    this.image = image;
    this.introduce = introduce;
    this.memberSuspension = memberSuspension;
  }

  @BeforeInsert()
  beforeInsert() {
    this.id = uuid();
  }
}
