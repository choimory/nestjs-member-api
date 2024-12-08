import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CommonTime } from '../../common/entities/common-time.entity';

@Entity()
export class Member extends CommonTime {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  nickname: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  introduce: string;

  constructor(
    createdAt: Date,
    modifiedAt: Date,
    deletedAt: Date,
    id: string,
    email: string,
    nickname: string,
    password: string,
    profileImage: string,
    introduce: string,
  ) {
    super(createdAt, modifiedAt, deletedAt);
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.password = password;
    this.profileImage = profileImage;
    this.introduce = introduce;
  }
}
