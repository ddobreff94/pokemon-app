import { Component, OnInit, inject } from "@angular/core";
import { NgForm, FormsModule } from "@angular/forms";
import { AuthenticationService } from "src/app/auth/authentication.service";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.scss"],
    standalone: true,
    imports: [FormsModule]
})
export class SignupComponent implements OnInit {
    private authService = inject(AuthenticationService);

	ngOnInit(): void {}

	onSubmit(form: NgForm) {
        this.authService.signup(form.value.email, form.value.password);
    }
}
