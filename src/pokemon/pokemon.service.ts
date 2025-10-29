import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDTO } from 'src/common/DTO/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(@InjectModel(Pokemon.name) private readonly PokemonModel: Model<Pokemon>,
private readonly configService:ConfigService) {

  }
  async create(createPokemonDto: CreatePokemonDto) {
    try {

      createPokemonDto.name = createPokemonDto.name.toLowerCase()
      const pokemon = await this.PokemonModel.create(createPokemonDto)
      return pokemon
    }
    catch (e) {

      if (e.code == 11000) {
        throw new BadRequestException(`pokmenos exist in db ${JSON.stringify(e.keyValue)}`)
      }

      throw new InternalServerErrorException()
    }
  }

  findAll(paginationDto:PaginationDTO) {
    const{limit=10,offset=0}=paginationDto
    return  this.PokemonModel.find().limit(limit).skip(offset).sort({no:1})
  }

  async findOne(id: string) {
    let pokemon: Pokemon | null = null
    if (!isNaN(+id)) {
      pokemon = await this.PokemonModel.findOne({ no: id })

    }

    if (isValidObjectId(id)) {
      pokemon = await this.PokemonModel.findById(id)


    }
    if (!pokemon) {
      pokemon = await this.PokemonModel.findOne({ name: id.toLowerCase().trim() })
    }
    if (!pokemon) {
      throw new NotFoundException("pokemon not found")
    }
    return pokemon
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemonDB = await this.findOne(id)

    if (updatePokemonDto) updatePokemonDto.name = updatePokemonDto.name?.toLocaleLowerCase()
    try {
      const savedPOkemons = await pokemonDB.updateOne(updatePokemonDto)
      return savedPOkemons
    }
    catch (e) {
      this.handleExceptions(e)
    }
  }

  async remove(id: string) {
      const pokemon = await this.findOne(id)
      
    await pokemon.deleteOne()
  }

  private handleExceptions(e: any) {
    if (e.code == 11000) {
      throw new BadRequestException(`There is another pokemno with that id ${JSON.stringify(e.keyValue)}`)
    }

    throw new InternalServerErrorException()

  }
}
