export class CommonResponseDto {
  statusCode: number;
  message: string;
  data?: any;

  constructor(code: number, message: string, data?: any) {
    this.statusCode = code;
    this.message = message;
    this.data = data;
  }
}
