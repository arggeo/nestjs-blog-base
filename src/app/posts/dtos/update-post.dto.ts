import { OmitType, PartialType } from '@nestjs/mapped-types';
import { PostDto } from './post.dto';
import { CreatePostDto } from './create-post.dto';
import { Expose } from 'class-transformer';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
