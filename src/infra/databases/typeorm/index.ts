import { TypeOrmModule } from '@nestjs/typeorm';
import config from '@infra/config';

export default TypeOrmModule.forRoot(config.typeOrmDb);
