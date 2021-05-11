import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TeachersModule } from '../teachers/teachers.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import TOKEN_SECRET from '../../env/token';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TeachersModule,
        PassportModule,
        JwtModule.register({
          secret: TOKEN_SECRET,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
