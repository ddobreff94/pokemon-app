import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { Subject } from 'rxjs';

import { AuthenticationService } from '../auth/authentication.service';

import { Pokemon } from '../common/pokemon.model';
import { PokemonClass } from '../common/pokermon-class.model';
import { User } from '../common/user.model';

@Injectable({
    providedIn: 'root',
})
export class FetchService {
    URL_API: string = 'https://pokeapi.co/api/v2/pokemon/';
    URL_DATABASE: string = 'https://pokemon-app-4b3e8-default-rtdb.europe-west1.firebasedatabase.app/';

    isLoading = new BehaviorSubject<boolean>(false);

    user: User = null;

    constructor(private http: HttpClient,
                private authService: AuthenticationService) {}
    
    previewPokemon = new Subject<Pokemon>();

    fetchPokemon(inputValue: string) {
        const value = inputValue.toLowerCase();
        console.log(value);

        return this.http
            .get<any>(this.URL_API + value)
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
        
        return this.http.get<Pokemon[]>(this.URL_DATABASE + `${this.user.id}/pokemon.json`)
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error has occured!';

        switch(errorResponse.error) {
            case 'Not Found':

            errorMessage = 'This pokemon was not found in the database!'
        }

        return throwError(() => new Error(errorMessage))
    }
}