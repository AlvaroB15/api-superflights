import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IFlight } from '../common/interfaces/flight.interface';
import { Model } from 'mongoose';
import { FLIGHT, PASSENGER } from '../common/models/models';
import { FlightDto } from './dto/flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}

  async save(flightDto: FlightDto): Promise<IFlight> {
    const newFlight = new this.model(flightDto);
    return newFlight.save();
  }

  async findAll(): Promise<IFlight[]> {
    return this.model.find({}).exec();
  }

  async findOne(id: string): Promise<IFlight> {
    return this.model.findById(id).populate(PASSENGER.name).exec();
  }

  async update(id: string, flightDto: FlightDto): Promise<IFlight> {
    return this.model.findByIdAndUpdate(id, flightDto, { new: true }).exec();
  }

  async delete(id: string): Promise<object> {
    await this.model.findByIdAndDelete(id).exec();
    return { status: HttpStatus.OK, message: 'Flight deleted successfully' };
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return this.model
      .findByIdAndUpdate(
        flightId,
        {
          $addToSet: { passengers: passengerId as any },
        },
        { new: true },
      )
      .populate(PASSENGER.name)
      .exec();
  }
}
