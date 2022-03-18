import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const exists = await this.usersService.checkUserExists({
      email: userDto.email,
      username: userDto.username,
    });

    if (exists) throw new BadRequestException('User already exists');

    const user = await this.usersService.create(userDto);
    return user;
  }

  async login(loginDto: LoginDto) {
    const payload = Object.assign({}, loginDto);

    const exists = await this.usersService.checkUserExists({
      email: payload.email,
      username: payload.username,
    });

    if (!exists) throw new NotFoundException('User not found');

    const passwordIsValid = await this.usersService.validateUser(payload);

    if (!passwordIsValid)
      throw new BadRequestException('Invalid password or username');

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
