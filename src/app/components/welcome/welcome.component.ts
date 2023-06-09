import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    standalone: true
})
export class WelcomeComponent implements OnInit {
    ngOnInit(): void {
    }
}
