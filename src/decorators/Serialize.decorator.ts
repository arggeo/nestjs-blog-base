import { UseInterceptors } from '@nestjs/common';
import { SerializerInterceptor } from 'src/interceptors/serializer.interceptor';
import ClassConstructor from 'src/interfaces/ClassConstructor.interface';

export function Serialize(dto: ClassConstructor) {
   return UseInterceptors(new SerializerInterceptor(dto));
}
