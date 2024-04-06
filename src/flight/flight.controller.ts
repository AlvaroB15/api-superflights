import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ENDPOINT_BASE } from '../common/models/models';
import { FlightService } from './flight.service';
import { FlightDto } from './dto/flight.dto';
import { IFlight } from '../common/interfaces/flight.interface';
import { PassengerService } from '../passenger/passenger.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('flights')
@Controller(`${ENDPOINT_BASE}flight`)
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}

  @Post()
  save(@Body() flightDto: FlightDto): Promise<IFlight> {
    return this.flightService.save(flightDto);
  }

  @Get()
  findAll(): Promise<IFlight[]> {
    return this.flightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IFlight> {
    return this.flightService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() flightDto: FlightDto,
  ): Promise<IFlight> {
    return this.flightService.update(id, flightDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<object> {
    return this.flightService.delete(id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ): Promise<IFlight> {
    const passenger = await this.passengerService.findOne(passengerId);
    if (!passenger) {
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
    }
    return this.flightService.addPassenger(flightId, passengerId);
  }
}
