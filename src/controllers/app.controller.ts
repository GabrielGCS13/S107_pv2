import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('healthcheck')
@Controller('/')
export default class AppController {
  @ApiOkResponse({
    description: 'Healthcheck',
    isArray: true,
    type: Object,
  })
  @Get('/health')
  async(): { message: string } {
    return {
      message: 'OK',
    };
  }
}
