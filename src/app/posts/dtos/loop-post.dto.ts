import { OmitType } from '@nestjs/mapped-types';
import { PostDto } from './post.dto';
import { Expose, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

export class LoopPostDto extends OmitType(PostDto, ['content'] as const) {}

export class PostLoopDto {
   @Expose()
   @Type(() => LoopPostDto)
   posts: LoopPostDto[];
}
