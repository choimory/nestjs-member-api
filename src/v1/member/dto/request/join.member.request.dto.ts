import { IsEmail, IsNotEmpty } from "class-validator";

export class JoinMemberRequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  password: string;
  //image:any;
  introduce: string;

  constructor(
    email: string,
    nickname: string,
    password: string,
    introduce: string,
  ) {
    this.email = email;
    this.nickname = nickname;
    this.password = password;
    this.introduce = introduce;
  }
}
