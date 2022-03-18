import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';

type CheckUser = Nullable<User>;
type UsernameOrEmail = {
  username?: string;
  email?: string;
};

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: CreateUserDto) {
    const createdUser = new this.userModel(userDto);
    const result = await createdUser.save();
    const user = result.toObject({ virtuals: true, versionKey: false });
    const { password, _id, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async checkUserExists({
    username,
    email,
  }: UsernameOrEmail): Promise<boolean> {
    let user: CheckUser;

    username && (user = await this.userModel.findOne({ username }));
    email && (user = await this.userModel.findOne({ email }));

    if (!user) return false;

    return true;
  }

  async validateUser(
    payload: UsernameOrEmail & { password: string },
  ): Promise<CheckUser> {
    const { password, email, username } = payload;
    let user: User;

    username && (user = await this.userModel.findOne({ username }));
    email && (user = await this.userModel.findOne({ email }));
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    return user;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }
}
