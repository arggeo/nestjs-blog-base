import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Post, PostDocument } from './post.schema';
import { CreatePostDto } from './dtos/create-post.dto';
import { SortBy, Sorting } from 'src/types/sorting.types';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostsService {
   constructor(@InjectModel('Post') private postModel: Model<Post>) {}

   getPosts(page: number, size: number, sort: Sorting, sortBy: SortBy): Promise<PostDocument[]> {
      const skip = (page - 1) * size;

      return this.postModel
         .find()
         .sort({ [sortBy]: sort })
         .skip(skip)
         .limit(size);
   }

   async getPost(id: string): Promise<PostDocument | null> {
      // console.log(isValidObjectId('foo'));
      return await this.postModel.findById(id);
   }

   createPost(post: CreatePostDto): Promise<PostDocument> {
      const postToBeCreated = new this.postModel(post);
      return postToBeCreated.save();
   }

   updatePost(id: string, post: UpdatePostDto) {
      return this.postModel.updateOne({ _id: id }, post);
   }

   deletePost(id: string): Promise<PostDocument> {
      return this.postModel.findByIdAndDelete(id);
   }
}
