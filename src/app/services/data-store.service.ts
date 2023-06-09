import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

import { Pokemon } from '../common/pokemon.model';

@Injectable({
    providedIn: 'root',
})
export class DataStoreService {
    constructor(private http: HttpClient,
                private authService: AuthenticationService) {}

    DATABASE_URL: string = 'https://pokemon-app-4b3e8-default-rtdb.europe-west1.firebasedatabase.app/';

    isDuplicate = new BehaviorSubject<boolean>(false);
    pokemonCollectionArr: Pokemon[] = [];

    storePokemonDatabase(selectedPokemon: Pokemon) {
        for (const pokemon of this.pokemonCollectionArr) {
            if (pokemon.name === selectedPokemon.name) {
                this.isDuplicate.next(true);
                break
            } 

            this.isDuplicate.next(false);
        }

        if (!this.isDuplicate.value) {
            this.pokemonCollectionArr.push(selectedPokemon);
            this.updateDatabase();
        }
    }

    removePokemon(index: number) {
        this.pokemonCollectionArr.splice(index, 1);

        this.updateDatabase();
    }

    updateDatabase() {
        this.authService.loggedUser
        .subscribe({
            next: (user) => {
                if (!user) {
                    return null
                }

                this.http.put(this.DATABASE_URL + `${user.id}/pokemon.json`, this.pokemonCollectionArr)
                .subscribe({
                    next: (response) => {
                        console.log(response);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                })
            }
        })
    }
}
