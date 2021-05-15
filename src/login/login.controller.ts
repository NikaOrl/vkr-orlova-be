import { Response } from 'express';
import { Body, Controller, Post, Res } from '@nestjs/common';

import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async teacherLogin(@Body() body, @Res() res: Response) {
    try {
      const { token, isAdmin } = await this.loginService.login(
        body.email,
        body.password,
      );

      res.status(200).json({
        status: 'success',
        token: token,
        isAdmin: isAdmin,
      });
    } catch (e) {
      console.log(e);
      res.status(500).send('Wrong credentials');
    }
  }
}
