import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './DTO/loginDTO';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { ValidCpf } from '../../decorators/validCpf.decorator';
import { AccountRequestDTO } from '../account/DTO/accountRequestDTO.model';
import { account } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login account' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @UseGuards(LocalAuthGuard)
  async login(@Body() req: LoginDTO) {
    return this.authService.login(req);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new account' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({
    status: 409,
    description: 'There is already a account with the CPF, CellPhone or Email provided',
  })
  register(@Body() @ValidCpf() account: AccountRequestDTO): Promise<account> {
    return this.authService.register(account);
  }
}
