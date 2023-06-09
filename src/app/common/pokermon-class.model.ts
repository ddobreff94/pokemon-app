import { PokemonAbility } from "./pokemon-ability.model";

export class PokemonClass {
    constructor(
        public name: string,
        public height: number,
        public weight: number,
        public sprites: { front_default: string },
        public abilities: PokemonAbility[],
        public dateAdded: number,
        public dateFormatted: string
    ) {}
}