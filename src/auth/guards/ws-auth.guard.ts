import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WsAuthGuard extends AuthGuard('wsjwt') {
  getRequest(context: ExecutionContext) {
    console.log('WSAUTHGUARD');
    console.log(context.switchToWs().getClient());

    return context.switchToWs().getClient()?.handshake;
  }
}
