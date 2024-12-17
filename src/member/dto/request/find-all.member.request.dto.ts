export class FindAllMemberRequestDto {
  id?: string;
  nickname?: string;
  createAt?: Date;
  createTo?: Date;

  constructor(
    id?: string,
    nickname?: string,
    createAt?: Date,
    createTo?: Date,
  ) {
    this.id = id;
    this.nickname = nickname;
    this.createAt = createAt;
    this.createTo = createTo;
  }
}
