import { Component, OnInit, EventEmitter, Output, Input, inject } from '@angular/core';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataStoreService } from 'src/app/services/data-store.service';
import { FetchService } from 'src/app/services/fetch.service';

import { Pokemon } from 'src/app/common/pokemon.model';
import { NgFor, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-card-item-pokemon',
    templateUrl: './card-item-pokemon.component.html',
    styleUrls: ['./card-item-pokemon.component.scss'],
    standalone: true,
    imports: [NgFor, TitleCasePipe]
})
export class CardItemPokemonComponent implements OnInit {
    private dataStoreService = inject(DataStoreService);
    private fetchService = inject(FetchService);

    collection: Pokemon[] = [];


    //Test getters/setters
    // private _test: string;

    // @Input() 
    // public get test() {
    //     return this._test
    // }

    // public set test(value: string) {
    //     this._test = value;
    // }

    @Output() emitCollection = new EventEmitter<Pokemon[]>();

    subscription: Subscription = new Subscription();

    ngOnInit(): void {
        // console.log(this._test)
        this.fetchService.fetchPokemonDatabase()
        .pipe(
            map(
                response => {
                    this.fetchService.isLoading.next(true);
                
                    if (response) {
                        return response
                    } else {
                        return []
                    }
                }
            )
        )
        .subscribe(
            response => {
                this.fetchService.isLoading.next(false);
                this.collection = response;
                this.dataStoreService.pokemonCollectionArr = response;
                this.emitCollectionEvent(this.collection);
            }
        )
    }

    emitCollectionEvent(collection: Pokemon[]) {
        this.emitCollection.emit(collection);
    }

    removePokemon(index: number) {
        this.dataStoreService.removePokemon(index);
    }
}
