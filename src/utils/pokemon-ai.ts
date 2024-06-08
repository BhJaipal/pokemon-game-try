import { attackResultEffect } from "./pokemon-types";
import { Pokemon } from "./types";

export function pokemonAI(pokemon: Pokemon, opposing: Pokemon) {
	let attackEff = pokemon.moves.map((move) => {
		return attackResultEffect(move, opposing);
	});
	let damage = attackEff.map((eff, i) => eff * pokemon.moves[i].damage);
	let maxDamage = Math.max(...damage);

	return damage.indexOf(maxDamage);
}
