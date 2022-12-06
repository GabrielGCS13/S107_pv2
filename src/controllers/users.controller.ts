import { Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import ListAllUsersUseCase from '@useCases/users/listAllUsers';
import ErrorResponseDTO from '@dtos/ErrorResponseDTO';
import User from '@entities/User';
import JwtAuthGuard from '@useCases/auth/jwt-auth.guard';
import CreateUsersUseCase from '@useCases/users/createUsers';
import UpdateUsersUseCase from '@useCases/users/updateUsers';
import ListByIdUsersUseCase from '@useCases/users/listByIdUsers';
import ListByUsernameUsersUseCase from '@useCases/users/listByUsernameUsers';
import OKResponseDTO from '@dtos/OKResponseDTO';
import { Request } from 'express';
import UpdateUserDTO from '@dtos/User/UpdateUserDTO';
import CreateUserDTO from '@dtos/User/CreateUserDTO';

@ApiTags('users')
@Controller('/users')
export default class UsersController {
  constructor(
    private listAllUsersUseCase: ListAllUsersUseCase,
    private createUsersUseCase: CreateUsersUseCase,
    private updateUsersUseCase: UpdateUsersUseCase,
    private listByIdUsersUseCase: ListByIdUsersUseCase,
    private listByUsernameUsersUseCase: ListByUsernameUsersUseCase
  ) {}

  @Post('/create')
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({
    description: 'Create user',
    isArray: true,
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad or missing parameters',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiForbiddenResponse({
    description: 'Wrong or missing credentials',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiTooManyRequestsResponse({
    description: 'Requests limit exceeded',
    isArray: false,
    type: ErrorResponseDTO,
  })
  async createUser(@Req() request: Request): Promise<OKResponseDTO> {
    return this.createUsersUseCase.execute(request);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/listAll')
  @ApiOkResponse({
    description: 'List all users',
    isArray: true,
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad or missing parameters',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiForbiddenResponse({
    description: 'Wrong or missing credentials',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiTooManyRequestsResponse({
    description: 'Requests limit exceeded',
    isArray: false,
    type: ErrorResponseDTO,
  })
  async listAllUsers(): Promise<User[]> {
    return this.listAllUsersUseCase.execute();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: String, required: true })
  @Get('/listId/:id')
  @ApiOkResponse({
    description: 'List one user',
    isArray: true,
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad or missing parameters',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiForbiddenResponse({
    description: 'Wrong or missing credentials',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiTooManyRequestsResponse({
    description: 'Requests limit exceeded',
    isArray: false,
    type: ErrorResponseDTO,
  })
  async listById(@Req() request: Request): Promise<User> {
    return this.listByIdUsersUseCase.execute(request);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/listUsername/:username')
  @ApiParam({ name: 'username', type: String, required: true })
  @ApiOkResponse({
    description: 'List one user',
    isArray: true,
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad or missing parameters',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiForbiddenResponse({
    description: 'Wrong or missing credentials',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiTooManyRequestsResponse({
    description: 'Requests limit exceeded',
    isArray: false,
    type: ErrorResponseDTO,
  })
  async listByUsername(@Req() request: Request): Promise<User> {
    return this.listByUsernameUsersUseCase.execute(request);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({ type: UpdateUserDTO })
  @Put('/edit/:id')
  @ApiOkResponse({
    description: 'Update user',
    isArray: true,
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad or missing parameters',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiForbiddenResponse({
    description: 'Wrong or missing credentials',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    isArray: false,
    type: ErrorResponseDTO,
  })
  @ApiTooManyRequestsResponse({
    description: 'Requests limit exceeded',
    isArray: false,
    type: ErrorResponseDTO,
  })
  async updateUsers(@Req() request: Request): Promise<OKResponseDTO> {
    return this.updateUsersUseCase.execute(request);
  }
}
