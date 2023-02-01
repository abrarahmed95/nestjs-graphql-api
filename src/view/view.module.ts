import { Module, Global } from '@nestjs/common';
import { ViewService } from './view.service';
import { ViewResolver } from './view.resolver';

@Global()
@Module({
  providers: [/*ViewResolver,*/ ViewService],
})
export class ViewModule {}
