import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { SeddController } from './sedd.controller';
import { SeddService } from './sedd.service';

@Module({
  controllers: [SeddController],
  providers: [SeddService],
  imports:[PokemonModule, CommonModule]
})
export class SeddModule {}
