import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    const isValidPassword = await this.usersService.checkPassword(
      password,
      user.password,
    );
    if (user && isValidPassword) return user;
    return null;
  }

  async signIn(user: any) {
    this.logger.log(JSON.stringify(user));
    const payload = {
      username: user.username,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(userDto: UserDto) {
    return this.usersService.create(userDto);
  }
}
