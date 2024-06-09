export type PokemonTypeNames =
	| "water"
	| "fire"
	| "grass"
	| "ground"
	| "rock"
	| "steel"
	| "fighting"
	| "fairy"
	| "dragon"
	| "poison"
	| "ghost"
	| "dark"
	| "psychic"
	| "bug"
	| "normal"
	| "ice"
	| "electric"
	| "flying";
export type PokemonMovesList =
	| [PokemonMove, PokemonMove, PokemonMove, PokemonMove]
	| [PokemonMove, PokemonMove, PokemonMove];
export type Stats = {
	speed: number;
	hp: number;
};
export class Pokemon {
	constructor(
		public type: PokemonTypeNames | [PokemonTypeNames, PokemonTypeNames],
		public name: string,
		public moves: PokemonMovesList,
		public scale: [number, number, number] = [1, 1, 1],
		public position: [number, number, number] = [-2.5, -1, 0],
		public src = "",
		public stats: Stats,
		public levitate = false
	) {}
}
export type effects = {
	"Not Very Effective": 0.5;
	Effective: 1;
	"Super Effective": 2;
	"No effect": 0;
};
export class PokemonMove {
	constructor(
		public moveName: string,
		public moveType: PokemonTypeNames = "normal",
		public damage: number
	) {}
}
export class PokemonType {
	constructor(public type: PokemonTypeNames) {}
}
