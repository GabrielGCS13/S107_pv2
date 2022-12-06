import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import AuthLoginUseCase from '@useCases/auth/authorization';
import LocalAuthGuard from '@useCases/auth/local-auth.guard';
import AuthLoginDTO from '@dtos/AuthLoginDTO';
import AuthResponseDTO from '@dtos/AuthResponseDTO';
import ErrorResponseDTO from '@dtos/ErrorResponseDTO';

@ApiTags('auth')
@Controller('/auth')
export default class AppController {
  constructor(private authService: AuthLoginUseCase) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiCreatedResponse({
    description: 'Send credentials to receive accessToken (Bearer Token)',
    isArray: false,
    type: AuthResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Bad or missing parameters',
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
  async login(@Body() body: AuthLoginDTO): Promise<AuthResponseDTO> {
    return this.authService.loginWithCredentials(body);
  }
}
