import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { IUser } from '../common/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(userDto: UserDto): Promise<IUser> {
    const hash = await this.hashPassword(userDto.password);
    const newUser = new this.model({
      ...userDto,
      password: hash,
    });
    return newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.model.find().exec();
  }

  async findOneById(id: string): Promise<IUser> {
    return this.model.findById(id).exec();
  }

  async update(id: string, userDto: UserDto): Promise<IUser> {
    const hash = await this.hashPassword(userDto.password);
    return this.model
      .findByIdAndUpdate(
        { _id: id },
        {
          ...userDto,
          password: hash,
        },
        { new: true },
      )
      .exec();
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id).exec();
    return { status: HttpStatus.OK, message: 'User deleted successfully' };
  }
}
