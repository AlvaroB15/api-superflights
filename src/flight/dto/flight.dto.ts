import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FlightDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly pilot: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly airplane: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly destinationCity: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly flightDate: Date;
}
