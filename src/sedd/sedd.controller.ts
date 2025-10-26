import { Controller, Get } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { SeddService } from './sedd.service';

@Controller('sedd')
export class SeddController {

  private readonly axios:AxiosInstance = axios
  constructor(private readonly seddService: SeddService) {}

  
  @Get()
  executeSeed(){  
    return this.seddService.executeSeed()
  }
}
