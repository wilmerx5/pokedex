import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeddModule } from './sedd/sedd.module';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", "public")
  }),
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/nest-pokemon"
),
    PokemonModule,
    CommonModule,
    SeddModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
