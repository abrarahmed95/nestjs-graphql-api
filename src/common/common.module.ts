import { Module } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';

@Module({
  providers: [TransformInterceptor],
  exports: [TransformInterceptor],
})
export class CommonModule {}
