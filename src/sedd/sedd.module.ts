import { Module } from '@nestjs/common';
import { SeddService } from './sedd.service';
import { SeddController } from './sedd.controller';

@Module({
  controllers: [SeddController],
  providers: [SeddService],
})
export class SeddModule {}
