import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../common/user.model';
import { AlertComponent } from '../shared/alert/alert.component';

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
    constructor(private http: HttpClient,
                private router: Router,
                private alertComponent: AlertComponent) {}

    // loginMsg = new BehaviorSubject<String>('');

    loginMsg = signal<String>('');

    loggedUser = new BehaviorSubject<User>(null);

    SIGNUP_URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdZUp4XOVlRMv6NzWbpqMMpMfvgHXELWw'
    SIGNIN_URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdZUp4XOVlRMv6NzWbpqMMpMfvgHXELWw'

    signup(email: string, password: string) {
        this.http.post<AuthResponseData>(
            this.SIGNUP_URL,
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
            this.SIGNIN_URL,
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
                this.loginMsg.set('You have logged in successfully!');
                this.loggedUser.next(user);
                this.router.navigate(['/']);
            },
            error: (error: any) => {
                // console.log(error)
                this.alertComponent.state.next('warning');

                switch(error.error.error.message) {
                    case 'INVALID_PASSWORD': 
                        this.loginMsg.set('Incorrect password, please try again.');
                        break;
                    case 'EMAIL_NOT_FOUND':
                        this.loginMsg.set('No registered user found with this email.');
                        break;
                    default:
                        this.loginMsg.set('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.')
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
