import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({
   timestamps: true,
   versionKey: false,
})
export class Post {
   @Prop()
   title: string;

   @Prop()
   excerpt: string;

   @Prop()
   content: string;

   @Prop()
   thumbnailUrl: string;

   @Prop({ immutable: true })
   createdAt: Date;

   @Prop({ immutable: true })
   updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.pre('save', function () {
   if (!this.excerpt) {
      const contentWords = this.content.split(' ');

      this.excerpt = contentWords.slice(0, 50).join(' ');

      this.excerpt =
         this.excerpt[this.excerpt.length - 1] === '.'
            ? this.excerpt.slice(0, this.excerpt.length - 1)
            : this.excerpt;
      this.excerpt = this.excerpt.trim() + '...';
   }
});
