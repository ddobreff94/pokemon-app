import { Component, OnInit, inject } from '@angular/core';

import { FetchService } from 'src/app/services/fetch.service';
import { Pokemon } from 'src/app/common/pokemon.model';
import { DataStoreService } from 'src/app/services/data-store.service';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-card-item-preview',
    templateUrl: './card-item-preview.component.html',
    styleUrls: ['./card-item-preview.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, TitleCasePipe]
})
export class CardItemPreviewComponent implements OnInit {
    private fetchService = inject(FetchService);
    private dataStoreService = inject(DataStoreService);

    duplicatePokemon: boolean = false;

    fetchedPokemon: Pokemon = {
        name: '',
        height: 0,
        weight: 0,
        sprites: { front_default: '' },
        abilities: [{ ability: { name: '' } }],
        dateAdded: 0,
        dateFormatted: ''
    };

    resetPokemon: Pokemon = {
        name: '',
        height: 0,
        weight: 0,
        sprites: { front_default: '' },
        abilities: [{ ability: { name: '' } }],
        dateAdded: 0,
        dateFormatted: ''
    };
    
    ngOnInit(): void {
        this.fetchService.previewPokemon
        .subscribe(
            response => {
                this.fetchedPokemon = response;
            }
        );
    }

    showDuplicateError() {
        this.duplicatePokemon = true;

        setTimeout(() => {
            this.duplicatePokemon = false;
        }, 3000);
    }

    addToCollection() {
        this.dataStoreService.storePokemonDatabase(this.fetchedPokemon);

        this.dataStoreService.isDuplicate
        .subscribe(
            (value) => {
                if (value) {
                    this.showDuplicateError();
                }
            }
        );

        this.fetchedPokemon = this.resetPokemon;
    }
}
