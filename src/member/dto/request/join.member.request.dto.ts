export class JoinMemberRequestDto {
  email: string;
  nickname: string;
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
