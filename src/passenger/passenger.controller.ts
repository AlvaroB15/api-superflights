import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ENDPOINT_BASE } from '../common/models/models';
import { PassengerDto } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';
import { IPassenger } from '../common/interfaces/passenger.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('passengers')
@Controller(`${ENDPOINT_BASE}passenger`)
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  async save(@Body() passengerDto: PassengerDto): Promise<IPassenger> {
    return this.passengerService.save(passengerDto);
  }

  @Get()
  async findAll(): Promise<IPassenger[]> {
    return this.passengerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IPassenger> {
    return this.passengerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() passengerDto: PassengerDto,
  ): Promise<IPassenger> {
    return this.passengerService.update(id, passengerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<object> {
    return this.passengerService.delete(id);
  }
}
