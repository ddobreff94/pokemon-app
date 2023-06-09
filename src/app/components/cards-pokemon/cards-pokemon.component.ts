import { Component, OnInit, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

import { Pokemon } from 'src/app/common/pokemon.model';
import { FetchService } from 'src/app/services/fetch.service';
import { CardItemPokemonComponent } from '../card-item-pokemon/card-item-pokemon.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-cards-pokemon',
    templateUrl: './cards-pokemon.component.html',
    styleUrls: ['./cards-pokemon.component.scss'],
    standalone: true,
    imports: [NgIf, LoadingSpinnerComponent, FormsModule, CardItemPokemonComponent]
})
export class CardsPokemonComponent implements OnInit {    
    private fetchService = inject(FetchService);

    collection: Pokemon[] = [];
    isLoading: boolean = false;
    finishedLoading: boolean = false;

    receiveCollection(collection: Pokemon[]) {
        this.collection = collection;
    }

    sortBy(form: NgForm) {
        console.log(this.collection);

        switch (form.value.criteria) {
            case 'Name':
                this.collection.sort((a, b) => (a.name > b.name) ? 1 : -1);
                break;

            case 'Weight': 
                this.collection.sort((a, b) => (a.weight > b.weight) ? -1 : 1);
                break;

            case 'Height': 
                this.collection.sort((a, b) => (a.height > b.height) ? -1 : 1);
                break;

            case 'Date':
                this.collection.sort((a, b) => (a.dateAdded > b.dateAdded) ? 1 : -1);
                break;
        }
    }

    ngOnInit(): void {
        this.fetchService.isLoading
        .subscribe(
            response => {
                if (response) {
                    this.isLoading = true;
                    this.finishedLoading = true;
                } else {
                    this.isLoading = false;
                }
            }
        )
    }
}
