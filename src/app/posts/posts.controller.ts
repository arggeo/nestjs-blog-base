import {
   Body,
   Controller,
   Get,
   Param,
   Patch,
   Post,
   Query,
   Delete,
   BadRequestException,
   InternalServerErrorException,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsQueryDto } from './dtos/posts-query.dto';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dtos/update-post.dto';
import { ErrorMessages } from 'src/enums/messages.enum';
import { Serialize } from 'src/decorators/Serialize.decorator';
import { PostLoopDto } from './dtos/loop-post.dto';
import { PostDto } from './dtos/post.dto';

@Controller('posts')
export class PostsController {
   constructor(private postsService: PostsService) {}

   @Serialize(PostLoopDto)
   @Get()
   async getPosts(@Query() query: PostsQueryDto) {
      const { page = 1, size = 10, sort = -1, sortBy = 'createdAt' } = query;

      try {
         const posts = await this.postsService.getPosts(page, size, sort, sortBy);
         return {
            posts,
         };
      } catch (err) {
         throw new InternalServerErrorException(ErrorMessages.SOMETHING_WENT_WRONG);
      }
   }

   // Needs improvement so it validates id param as MongoID
   @Get(':id')
   async getPost(@Param('id') id: string) {
      try {
         const result = await this.postsService.getPost(id);

         if (!result) {
            throw new BadRequestException(ErrorMessages.POST_NOT_FOUND);
         }

         return {
            post: result,
         };
      } catch (err) {
         if (err instanceof BadRequestException) {
            throw new BadRequestException(err.message);
         }

         throw new InternalServerErrorException(ErrorMessages.SOMETHING_WENT_WRONG);
      }
   }

   @Post()
   async createPost(@Body() body: CreatePostDto) {
      try {
         return await this.postsService.createPost(body);
      } catch (err) {
         throw new InternalServerErrorException(ErrorMessages.SOMETHING_WENT_WRONG);
      }
   }

   @Patch(':id')
   async updatePost(@Param('id') id: string, @Body() body: UpdatePostDto) {
      try {
         if (!Object.keys(body).length) {
            throw new BadRequestException('No fields provided for update.');
         }

         const result = await this.postsService.updatePost(id, body);

         if (!result.matchedCount) {
            throw new BadRequestException(ErrorMessages.POST_NOT_FOUND);
         }

         return {
            updatedFields: Object.keys(body).filter((key) => body[key]),
         };
      } catch (err) {
         if (err instanceof BadRequestException) {
            throw new BadRequestException(err.message);
         }

         throw new InternalServerErrorException(ErrorMessages.SOMETHING_WENT_WRONG);
      }
   }

   @Delete(':id')
   async deletePost(@Param('id') id: string) {
      try {
         const result = await this.postsService.deletePost(id);

         if (!result) {
            throw new BadRequestException(ErrorMessages.POST_NOT_FOUND);
         }

         return result;
      } catch (err) {
         if (err instanceof BadRequestException) {
            throw new BadRequestException(err.message);
         }

         throw new InternalServerErrorException(ErrorMessages.SOMETHING_WENT_WRONG);
      }
   }
}
