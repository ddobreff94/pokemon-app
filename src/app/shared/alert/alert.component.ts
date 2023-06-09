import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    standalone: true
})
export class AlertComponent implements OnInit {
    state = new Subject<String>();
    stateClass: String = '';

    @Input() message: String = 'Your alert works!';
    @Output() close = new EventEmitter<void>();

    constructor() {
        this.state
            .subscribe(res => {
                console.log(res)

                switch(res) {
                    case 'warning':
                        this.stateClass = 'warning';
                        break;
                    case 'success':
                        this.stateClass = 'success';
                        break;
                    case 'alert':
                        this.stateClass = 'alert';
                        break;
                    default:
                        this.stateClass = '';
                        break;
                }

                console.log(this.stateClass)
            })

        setTimeout(() => {
            // this.onClose();
        }, 5000);
    }

    ngOnInit(): void {
    }

    onClose() {
        this.close.emit();
    }
}
