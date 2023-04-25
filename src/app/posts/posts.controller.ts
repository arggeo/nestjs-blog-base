import {
   Body,
   Controller,
   Get,
   Param,
   Patch,
   Post,
   Query,
   Delete,
   HttpException,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PaginationQueryDto } from './dtos/pagination-query.dto';

@Controller('posts')
export class PostsController {
   @Get()
   getPosts(@Query() query: PaginationQueryDto): null {
      const { page = 1, size = 10, sort = -1 } = query;
      return null;
   }

   @Get(':id')
   getPost(@Param() id: string): null {
      return null;
   }

   @Post()
   createPost(@Body() body: CreatePostDto): any {
      return body;
   }

   @Patch()
   updatePost(@Body() body: any): null {
      if (!Object.keys(body).length) {
         throw new HttpException('No fields provided', 400);
      }
      return null;
   }

   @Delete('id')
   deletePost(@Param() id: string): null {
      return null;
   }
}
