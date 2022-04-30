import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { registerErrors } from 'src/auth/constants';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findOneByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username }).exec();
  }

  async create(user: RegisterUserDto): Promise<any> {
    const usr = await this.findOneByUsername(user.username);
    if (usr) {
      return registerErrors.USER_EXISTS;
    } else if (user.password !== user.passwordConfirm) {
      return registerErrors.BAD_PW_CONF;
    }
    const newUser = new this.userModel({ ...user });
    const result = await newUser.save();
    return result.id;
  }
}
