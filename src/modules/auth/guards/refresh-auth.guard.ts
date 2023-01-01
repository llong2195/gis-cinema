import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ErrorCode } from '@src/enum/errorCode.enum';
import { LoggerService } from '@src/logger/custom.logger';

@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh') {
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        // You can throw an exception based on either "info" or "err" arguments

        if (err || !user || info) {
            console.warn(`RefreshAuthGuard: ${info}`, info);
            console.warn(`RefreshAuthGuard: ${err}`);
            LoggerService.error(err, user, info, context.switchToHttp().getRequest().ip, status);
            throw new UnauthorizedException(ErrorCode.INVALID_TOKEN);
        }
        return super.handleRequest(err, user, info, context, status);
    }
}
