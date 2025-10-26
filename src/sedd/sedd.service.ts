import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { pokeResponse } from './interfaces/poke-response.intertace';

@Injectable()
export class SeddService {
  private readonly axios: AxiosInstance = axios
  async executeSeed() {
    const { data } = await this.axios.get<pokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=100")

    data.results.forEach(({ name, url }) => {
      const segments =  url.split("/")
      const no:number = +segments[segments.length-2]
     })
    return data.results
  }
}
