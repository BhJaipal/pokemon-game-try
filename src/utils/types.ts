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
export type PokemonMovesList = [
	PokemonMove,
	PokemonMove,
	PokemonMove,
	PokemonMove
];
export class Pokemon {
	constructor(
		public type: PokemonTypeNames | [PokemonTypeNames, PokemonTypeNames],
		public name: string,
		public moves: Array<PokemonTypeNames>,
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
