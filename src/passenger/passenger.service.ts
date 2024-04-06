import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from '../common/models/models';
import { PassengerDto } from './dto/passenger.dto';
import { Model } from 'mongoose';
import { IPassenger } from '../common/interfaces/passenger.interface';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}

  async save(passengerDto: PassengerDto): Promise<IPassenger> {
    const newPassenger = new this.model(passengerDto);
    return newPassenger.save();
  }

  async findAll(): Promise<IPassenger[]> {
    return this.model.find({}).exec();
  }

  async findOne(id: string): Promise<IPassenger> {
    return this.model.findById(id).exec();
  }

  async update(id: string, passengerDto: PassengerDto): Promise<IPassenger> {
    return this.model.findByIdAndUpdate(id, passengerDto, { new: true }).exec();
  }

  async delete(id: string): Promise<object> {
    await this.model.findByIdAndDelete(id).exec();
    return { status: HttpStatus.OK, message: 'Passenger deleted successfully' };
  }
}
