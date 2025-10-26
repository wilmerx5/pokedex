import { PartialType } from '@nestjs/mapped-types';
import { CreateSeddDto } from './create-sedd.dto';

export class UpdateSeddDto extends PartialType(CreateSeddDto) {}
