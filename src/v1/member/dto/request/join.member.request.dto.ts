import { IsEmail, IsNotEmpty } from 'class-validator';

export class JoinMemberRequestDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly nickname: string;

  @IsNotEmpty()
  readonly password: string;
  readonly image: File;
  readonly introduce: string;

  constructor(
    email: string,
    nickname: string,
    password: string,
    image: File,
    introduce: string,
  ) {
    this.email = email;
    this.nickname = nickname;
    this.password = password;
    this.image = image;
    this.introduce = introduce;
  }
}
