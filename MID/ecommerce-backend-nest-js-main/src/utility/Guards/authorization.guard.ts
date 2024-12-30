import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<string[]>(
      'allowedRoles',
      context.getHandler(),
    );

    // If no roles are specified, allow by default
    if (!allowedRoles) return true;

    const request = context.switchToHttp().getRequest();
    const currentUser = request?.currentUser;

    if (!currentUser || !Array.isArray(currentUser.roles)) {
      throw new UnauthorizedException('User information is missing or invalid');
    }

    // Check if user roles intersect with allowed roles
    const hasRole = currentUser.roles.some((role: string) =>
      allowedRoles.includes(role),
    );

    if (!hasRole) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }

    return true;
  }
}
