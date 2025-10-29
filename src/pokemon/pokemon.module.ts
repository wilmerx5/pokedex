import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    ConfigModule,
    MongooseModule.forFeature([
      {
        name:Pokemon.name,
        schema: PokemonSchema
      }
    ]),

  ],
  exports:[PokemonService, MongooseModule]
})
export class PokemonModule {}
