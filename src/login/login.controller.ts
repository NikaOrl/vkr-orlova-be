import { Controller, Post } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Post()
  teacherLogin(): string {
    return 'Teacher login';
  }
}
