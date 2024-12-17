export class CommonPageRequestDto {
  readonly page: number = 1;
  readonly size: number = 20;

  constructor(page: number, size: number) {
    this.page = page < 1 ? 1 : page;
    this.size = size < 1 ? 1 : size;
  }

  getOffset(): number {
    return (this.page - 1) * this.size;
  }

  getLimit(): number {
    return this.size;
  }
}
