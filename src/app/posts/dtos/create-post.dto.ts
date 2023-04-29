import { OmitType, PartialType } from '@nestjs/mapped-types';
import { PostDto } from './post.dto';

export class CreatePostDto extends PartialType(
   OmitType(PostDto, ['_id', 'createdAt', 'updatedAt'] as const),
) {}
