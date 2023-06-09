import { PokemonAbility } from "./pokemon-ability.model";

export interface Pokemon {
    // id?: number,
    name: string,
    height: number,
    weight: number,
    sprites: { front_default: string },
    abilities: PokemonAbility[],
    dateAdded: number,
    dateFormatted: string
}