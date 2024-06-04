import { Pokemon, PokemonMove, PokemonType, PokemonTypeNames } from "./types";

export const Normal = new PokemonType("normal");
export const Fire = new PokemonType("fire");
export const Water = new PokemonType("water");
export const Electric = new PokemonType("electric");
export const Grass = new PokemonType("grass");
export const Ice = new PokemonType("ice");
export const Fighting = new PokemonType("fighting");
export const Poison = new PokemonType("poison");
export const Ground = new PokemonType("ground");
export const Flying = new PokemonType("flying");
export const Psychic = new PokemonType("psychic");
export const Bug = new PokemonType("bug");
export const Rock = new PokemonType("rock");
export const Ghost = new PokemonType("ghost");
export const Dragon = new PokemonType("dragon");
export const Dark = new PokemonType("dark");
export const Steel = new PokemonType("steel");
export const Fairy = new PokemonType("fairy");

function normalEffect() {
	let normals: { [k in PokemonTypeNames]: number } = {
		water: 1,
		fire: 1,
		grass: 1,
		ground: 1,
		rock: 1,
		steel: 1,
		fighting: 1,
		fairy: 1,
		dragon: 1,
		poison: 1,
		ghost: 1,
		dark: 1,
		psychic: 1,
		bug: 1,
		normal: 1,
		ice: 1,
		electric: 1,
		flying: 1,
	};
	return normals;
}

export const typeEffect: Record<
	PokemonTypeNames,
	Record<PokemonTypeNames, number>
> = {
	normal: {
		...normalEffect(),
		rock: 0.5,
		ghost: 0,
		steel: 0.5,
	},
	water: {
		...normalEffect(),
		fire: 2,
		water: 0.5,
		grass: 0.5,
		dragon: 0.5,
	},
	fire: {
		...normalEffect(),
		water: 0.5,
		fire: 0.5,
		dragon: 0.5,
		rock: 0.5,
		grass: 2,
		ice: 2,
		bug: 2,
		steel: 2,
	},
	grass: {
		...normalEffect(),
		fire: 0.5,
		water: 2,
		grass: 0.5,
		poison: 0.5,
		ground: 2,
		flying: 0.5,
		bug: 0.5,
		rock: 2,
		dragon: 0.5,
	},
	electric: {
		...normalEffect(),
		water: 2,
		electric: 0.5,
		grass: 0.5,
		ground: 0,
		flying: 2,
		dragon: 0.5,
	},
	ice: {
		...normalEffect(),
		steel: 0.5,
		ice: 0.5,
		fire: 0.5,
		water: 0.5,
		ground: 2,
		dragon: 2,
		flying: 2,
		grass: 2,
	},
	fighting: {
		...normalEffect(),
		ghost: 0,
		fairy: 0.5,
		poison: 0.5,
		flying: 0.5,
		psychic: 0.5,
		bug: 0.5,
		normal: 2,
		ice: 2,
		rock: 2,
		dark: 2,
		steel: 2,
	},
	poison: {
		...normalEffect(),
		steel: 0,
		grass: 2,
		fairy: 2,
		poison: 0.5,
		ground: 0.5,
		rock: 0.5,
		ghost: 0.5,
	},
	ground: {
		...normalEffect(),
		flying: 0,
		rock: 2,
		steel: 2,
		fire: 2,
		electric: 2,
		poison: 2,
		grass: 0.5,
		bug: 0.5,
	},
	flying: {
		...normalEffect(),
		grass: 2,
		fighting: 2,
		bug: 2,
		electric: 0.5,
		rock: 0.5,
		steel: 0.5,
	},
	psychic: {
		...normalEffect(),
		dark: 0,
		fighting: 2,
		poison: 2,
		steel: 0.5,
		psychic: 0.5,
	},
	bug: {
		...normalEffect(),
		fire: 0.5,
		fighting: 0.5,
		poison: 0.5,
		flying: 0.5,
		ghost: 0.5,
		steel: 0.5,
		fairy: 0.5,
	},
	rock: {
		...normalEffect(),
		steel: 0.5,
		ground: 0.5,
		fighting: 0.5,
		bug: 2,
		flying: 2,
		ice: 2,
		fire: 2,
	},
	ghost: {
		...normalEffect(),
		normal: 0,
		dark: 0.5,
		ghost: 2,
		psychic: 2,
	},
	dragon: {
		...normalEffect(),
		dragon: 2,
		steel: 0.5,
		fairy: 0,
	},
	dark: {
		...normalEffect(),
		fighting: 0.5,
		psychic: 2,
		ghost: 2,
		dark: 0.5,
		fairy: 0.5,
	},
	steel: {
		...normalEffect(),
		ice: 2,
		rock: 2,
		fairy: 2,
		steel: 0.5,
		fire: 0.5,
		water: 0.5,
		electric: 0.5,
	},
	fairy: {
		...normalEffect(),
		dragon: 2,
		ghost: 2,
		fighting: 2,
		poison: 0.5,
		fire: 0.5,
		dark: 0.5,
	},
};
export function attackResultEffect(move: PokemonMove, target: Pokemon) {
	if (typeof target.type === "string") {
		return typeEffect[move.moveType][target.type];
	} else {
		let effs = [
			typeEffect[move.moveType][target.type[0]],
			typeEffect[move.moveType][target.type[1]],
		];
		if (effs[0] == 0 || effs[1] == 0) {
			return 0;
		} else if (effs[0] == 0.5 && [1, 2].includes(effs[1])) {
			return effs[1];
		} else if (effs[1] == 0.5 && [1, 2].includes(effs[0])) {
			return effs[0];
		} else {
			return effs[0] * effs[1];
		}
	}
}
export function howMuchEffective(num: number) {
	if (num == 0) {
		return "No Effect";
	} else if (num == 0.5) {
		return "Not Very Effective";
	} else if (num == 1) {
		return "Effective";
	} else if (num == 2) {
		return "Super Effective";
	}
}
