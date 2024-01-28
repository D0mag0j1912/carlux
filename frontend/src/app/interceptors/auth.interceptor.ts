import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { AuthenticationFacadeService } from '../store/auth/facades/auth-facade.service';
import { LoginResponseDto as UserData } from '../api/models/login-response-dto';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private _authenticationFacadeService = inject(AuthenticationFacadeService);

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this._authenticationFacadeService.selectUserData().pipe(
            take(1),
            switchMap((userData: UserData | undefined) => {
                const authRequest: HttpRequest<unknown> = request.clone({
                    headers: request.headers.set('authorization', 'Bearer ' + userData?.token),
                });
                return next.handle(authRequest);
            }),
        );
    }
}
