import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './CONFIG/app.config';
import { JoiValidationSchema } from './CONFIG/joi.validation';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeddModule } from './sedd/sedd.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema:JoiValidationSchema
    }),
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", "public")
  }),
    MongooseModule.forRoot(process.env.MONGODB!,{
      dbName:'pokemonsDB'
    }),
    PokemonModule,
    CommonModule,
    SeddModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
