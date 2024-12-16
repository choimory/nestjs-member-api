export class UpdateMemberRequestDto {
  nickname?: string;
  password?: string;
  //image:any;
  introduce?: string;

  constructor(nickname?: string, password?: string, introduce?: string) {
    this.nickname = nickname;
    this.password = password;
    this.introduce = introduce;
  }
}
