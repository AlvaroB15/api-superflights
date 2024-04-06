import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ENDPOINT_BASE } from '../common/models/models';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller(`${ENDPOINT_BASE}user`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user through id' })
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Put a user' })
  update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
