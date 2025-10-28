import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { pokeResponse } from './interfaces/poke-response.intertace';

@Injectable()
export class SeddService {

  constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  private  readonly http:AxiosAdapter) {

  }
  async executeSeed() {

    await this.pokemonModel.deleteMany({})
    const data  = await this.http.get<pokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=400")


    let i = 0

    for (const { name, url } of data.results) {
      const segments = url.split("/")
      const no: number = +segments[segments.length - 2]

      try {
        await this.pokemonModel.create({ name, no })
        i += 1
        console.log("adding", name)
      } catch (e) {
        console.error("Error creating:", name, e.message)
      }
    }

    return `seed executed ${i} pokemons added`
  }
}
