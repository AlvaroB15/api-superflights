import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ENDPOINT_BASE } from '../common/models/models';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller(`${ENDPOINT_BASE}auth`)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req: any) {
    this.logger.log(JSON.stringify(req));
    return this.authService.signIn(req.user);
  }

  @Post('signup')
  async signUp(@Body() userDto: UserDto) {
    return this.authService.signUp(userDto);
  }
}
