import { createParamDecorator, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
import { parseCookies } from '@diploma-v2/common/utils-common';
import { CookieTokenDataI } from '@diploma-v2/common/constants-common';

export const GQLRequest = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(context);
    return gqlCtx.getContext().req;
  },
);

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext): CookieTokenDataI => {
    const gqlCtx = GqlExecutionContext.create(context);
    const request = gqlCtx.getContext().req;
    const cookie = request.headers.cookie;
    const token = parseCookies(cookie)[process.env.NX_AUTH_COOKIE_NAME];
    return jwt.decode(token) as CookieTokenDataI; // maybe service better?
  },
);

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const request = gqlCtx.getContext().req;
    const cookie = request.headers.cookie;
    if (!cookie) throw new UnauthorizedException();
    const token = parseCookies(cookie)[process.env.NX_AUTH_COOKIE_NAME];
    const data = await this.authService.parseToken(token) as CookieTokenDataI;
    if (!data || data.exp * 1000 <= Date.now()) throw new UnauthorizedException();
    return true;
  }
}
