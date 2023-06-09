import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../common/user.model';
import { AlertComponent } from '../shared/alert/alert.component';
import { Constants } from '../common/constants';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root',
})

export class AuthenticationService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private alertComponent = inject(AlertComponent);
    
    loginMsg = signal<String>('');
    loggedUser = new BehaviorSubject<User>(null);

    signup(email: string, password: string) {
        this.http.post<AuthResponseData>(
            Constants.SIGNUP_URL,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .subscribe(
            response => {
                this.login(email, password);
                console.log(response);
            }
        )
    }

    login(email: string, password: string) {
        this.http.post<AuthResponseData>(
            Constants.SIGNIN_URL,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .subscribe({
            next: (response: AuthResponseData) => {
                // console.log(response);
                const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);

                const user = new User(
                    response.email,
                    response.localId,
                    response.idToken,
                    expirationDate
                );
                
                this.alertComponent.state.next('success');
                this.loginMsg.set(Constants.LOGIN_SUCCESS);
                this.loggedUser.next(user);
                this.router.navigate(['/']);
            },
            error: (error: any) => {
                // console.log(error)
                this.alertComponent.state.next('warning');

                switch(error.error.error.message) {
                    case 'INVALID_PASSWORD': 
                        this.loginMsg.set(Constants.INCORRECT_PWD);
                        break;
                    case 'EMAIL_NOT_FOUND':
                        this.loginMsg.set(Constants.EMAIL_NOT_FOUND);
                        break;
                    default:
                        this.loginMsg.set(Constants.TOO_MANY_LOGIN_ATTEMPTS);
                        break;
                }
            }
        })
    }

    logout() {
        this.loggedUser.next(null);
        this.loginMsg.set('');
    }
}
