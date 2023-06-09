import { Component, OnInit, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [NgIf, AlertComponent, FormsModule]
})
export class LoginComponent implements OnInit {
    private authService = inject(AuthenticationService);

    loginMessage: String = '';

    ngOnInit(): void {}

    onSubmit(form: NgForm) {
        this.authService.login(form.value.email, form.value.password);
        this.authService.loginMsg
            .subscribe(
                response => this.loginMessage = response
            )
        form.resetForm();
    }

    handleAlert() {
        this.loginMessage = '';
    }
}
