import { CommonTime } from '../../common/entities/common-time.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v7 as uuid } from 'uuid';
import { Member } from './member.entity';

@Entity()
export class MemberSuspension extends CommonTime {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Member, (member) => member.id)
  @JoinColumn({ name: 'member_id', referencedColumnName: 'id' })
  member: Member;

  @Column()
  reason: string;

  @Column()
  suspendedAt: Date;

  @Column()
  suspendedTo: Date;

  constructor(
    createdAt: Date,
    modifiedAt: Date,
    deletedAt: Date,
    id: string,
    member: Member,
    reason: string,
    suspendedAt: Date,
    suspendedTo: Date,
  ) {
    super(createdAt, modifiedAt, deletedAt);
    this.id = id;
    this.member = member;
    this.reason = reason;
    this.suspendedAt = suspendedAt;
    this.suspendedTo = suspendedTo;
  }

  @BeforeInsert()
  generateUuid() {
    this.id = uuid();
  }
}
