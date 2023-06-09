import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { Subject } from 'rxjs';

import { AuthenticationService } from '../auth/authentication.service';

import { Pokemon } from '../common/pokemon.model';
import { Constants } from '../common/constants';
import { PokemonClass } from '../common/pokermon-class.model';
import { User } from '../common/user.model';

@Injectable({
    providedIn: 'root',
})
export class FetchService {
    isLoading = new BehaviorSubject<boolean>(false);

    user: User = null;

    private http = inject(HttpClient);
    private authService = inject(AuthenticationService);
    
    previewPokemon = new Subject<Pokemon>();

    fetchPokemon(inputValue: string) {
        const value = inputValue.toLowerCase();
        console.log(value);

        return this.http
            .get<any>(Constants.URL_API + value)
            .pipe(
                map((responseData) => {
                    let newPokemon = new PokemonClass(
                        responseData.name,
                        responseData.height,
                        responseData.weight,
                        responseData.sprites,
                        responseData.abilities,
                        new Date().getTime(),
                        new Date().toLocaleString()
                    );

                    return newPokemon;
                }),
                tap(response => {
                    console.log(response)
                    this.previewPokemon.next(response);
                }),
                catchError(this.handleError)
            )
            
    }

    fetchPokemonDatabase() {
        this.authService.loggedUser
        .subscribe(
            user => {
                this.user = user;
            }
        )
        
        return this.http.get<Pokemon[]>(Constants.URL_DATABASE + `${this.user.id}/pokemon.json`)
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = Constants.UNKNOWN_ERR;

        switch(errorResponse.error) {
            case Constants.NOT_FOUND:

            errorMessage = Constants.POKEMON_NOT_FOUND;
        }

        return throwError(() => new Error(errorMessage))
    }
}