import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcryptjs');

import { TeachersService } from '../teachers/teachers.service';

@Injectable()
export class AuthService {
  constructor(
    private teachersService: TeachersService,
    private jwtService: JwtService,
  ) {}

  async validateTeacher(email: string, pass: string): Promise<any> {
    const teacher = await this.teachersService.findOne(email);

    const isMatch = await bcrypt.compare(pass, teacher.password);

    if (teacher && isMatch) {
      const { password, ...result } = teacher;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
