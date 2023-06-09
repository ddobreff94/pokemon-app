import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { User } from 'src/app/common/user.model';
import { DataStoreService } from 'src/app/services/data-store.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [RouterLink, NgIf]
})
export class HeaderComponent implements OnInit {
    private authService = inject(AuthenticationService);

    user: User = null;
    userSub = new Subscription;

    onLogout() {
        this.authService.logout();
    }

    ngOnInit(): void {
        this.userSub = this.authService.loggedUser
        .subscribe(
            user => {
                this.user = user;
            }
        )
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
