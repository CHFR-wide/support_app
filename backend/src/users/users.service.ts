import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username }).exec();
  }

  async create(user: RegisterUserDto): Promise<string> {
    if (user.password !== user.passwordConfirm) {
      return null;
    }
    const newUser = new this.userModel({ ...user });
    console.log(newUser);
    const result = await newUser.save();
    return result.id;
  }
}
