import { Ref } from "vue";
import { Pokemon, PokemonMove } from "./types";
import { resultAttackResultEffect, attackResultEffect } from "./pokemon-types";
import { pokemonAI } from "./pokemon-ai";

interface ResultShow {
	message: string;
	show: boolean;
}
interface Players {
	p1: Pokemon;
	p1Hp: number;
	p2Hp: number;
	p2: Pokemon;
}
export function attack(
	move: PokemonMove,
	poke: Pokemon,
	oppo: Pokemon,
	resultShow: ResultShow,
	usingMove: Ref<boolean>,
	sleep: Ref<number>,
	players: Players
) {
	if (players.p1.stats.speed > players.p2.stats.speed) {
		// 1: p1
		resultShow.message = `${poke.name} used ${move.moveName}`;
		let eff = attackResultEffect(move, oppo);
		if (eff * move.damage > players.p2Hp) {
			// p2 HP 0
			for (let i = 0; i < players.p2Hp; i++) {
				setTimeout(() => {
					players.p2Hp--;
				}, i);
			}
			// message timers
			setTimeout(() => {
				resultShow.message = resultAttackResultEffect(eff, oppo);
			}, sleep.value);
			sleep.value += 1000;
			setTimeout(() => {
				resultShow.message = `Oppenent's ${oppo.name} fainted`;
			}, sleep.value);
			sleep.value += 1000;
			setTimeout(() => {
				resultShow.message = `Your ${poke.name} is the winner!`;
			}, sleep.value);
			sleep.value += 1000;
			setTimeout(() => {
				resultShow.show = false;
				resultShow.message = "";
			}, sleep.value);
			sleep.value += 2000;
		} else {
			// message timers
			setTimeout(() => {
				resultShow.message = resultAttackResultEffect(eff, oppo);
			}, sleep.value);
			sleep.value += 1000;
			// p2 HP reduce
			for (let i = 0; i < move.damage * eff; i++) {
				setTimeout(() => {
					players.p2Hp--;
				}, i);
			}
			if (isSecondCall) {
				setTimeout(() => {
					resultShow.show = false;
					resultShow.message = "";
				}, sleep.value);
				sleep.value += 1000;
			}
		}
		// 2 p2
		setTimeout(() => {
			if (players.p2Hp <= 0) return;
			let p2moves = players.p2.moves;
			let randomMove = p2moves[pokemonAI(players.p2, players.p1)];
			resultShow.message = `Opponent ${poke.name} used ${move.moveName}`;
			let eff2 = attackResultEffect(randomMove, poke);
			if (eff2 * randomMove.damage > players.p1Hp) {
				// p2 HP 0
				for (let i = 0; i < players.p1Hp; i++) {
					setTimeout(() => {
						players.p1Hp--;
					}, i);
				}
				// message timers
				setTimeout(() => {
					resultShow.message = resultAttackResultEffect(eff2, poke);
				}, sleep.value);
				sleep.value += 1000;
				setTimeout(() => {
					resultShow.message = `Your ${poke.name} fainted`;
				}, sleep.value);
				sleep.value += 1000;
				setTimeout(() => {
					resultShow.message = `Opposing ${oppo.name} is the winner!`;
				}, sleep.value);
				sleep.value += 1000;
			} else {
				// message timers
				setTimeout(() => {
					resultShow.message = resultAttackResultEffect(eff2, poke);
				}, sleep.value);
				sleep.value += 1000;
				// p2 HP reduce
				for (let i = 0; i < randomMove.damage * eff2; i++) {
					setTimeout(() => {
						players.p1Hp--;
					}, i);
				}
			}
			setTimeout(() => {
				resultShow.show = false;
				resultShow.message = "";
			}, sleep.value);
			sleep.value += 2000;
		}, sleep.value);
	} else {
		// 3 p2
		let p2moves = players.p2.moves;
		let randomMove = p2moves[pokemonAI(players.p2, players.p1)];
		resultShow.message = `Opponent's ${oppo.name} used ${randomMove.moveName}`;
		let eff2 = attackResultEffect(randomMove, poke);
		if (eff2 * randomMove.damage >= players.p1Hp) {
			// p2 HP 0
			for (let i = 0; i < players.p1Hp; i++) {
				setTimeout(() => {
					players.p1Hp--;
				}, i);
			}
			// message timers
			setTimeout(() => {
				resultShow.message = resultAttackResultEffect(eff2, poke);
			}, sleep.value);
			sleep.value += 1000;
			setTimeout(() => {
				resultShow.message = `Your ${poke.name} fainted`;
			}, sleep.value);
			sleep.value += 1000;
			setTimeout(() => {
				resultShow.message = `Opposing ${oppo.name} is the winner!`;
			}, sleep.value);
			sleep.value += 1000;
			setTimeout(() => {
				resultShow.show = false;
				resultShow.message = "";
			}, sleep.value);
			sleep.value += 2000;
		} else {
			// message timers
			setTimeout(() => {
				resultShow.message = resultAttackResultEffect(eff2, oppo);
			}, sleep.value);
			sleep.value += 1000;
			// p2 HP reduce
			for (let i = 0; i < randomMove.damage * eff2; i++) {
				setTimeout(() => {
					players.p1Hp--;
				}, i);
			}
		}
		// 4 p1
		setTimeout(() => {
			if (players.p1Hp <= 0) return;
			console.log(players.p1Hp, players.p2Hp);
			resultShow.message = `${poke.name} used ${move.moveName}`;
			let eff = attackResultEffect(move, oppo);
			if (eff * move.damage > players.p2Hp) {
				// p2 HP 0
				for (let i = 0; i < players.p2Hp; i++) {
					setTimeout(() => {
						players.p2Hp--;
					}, i);
				}
				// message timers
				setTimeout(() => {
					resultShow.message = resultAttackResultEffect(eff, oppo);
				}, sleep.value);
				sleep.value += 1000;
				setTimeout(() => {
					resultShow.message = `Opposing ${oppo.name} fainted`;
				}, sleep.value);
				sleep.value += 1000;
				setTimeout(() => {
					resultShow.message = `Your ${poke.name} is the winner!`;
				}, sleep.value);
				sleep.value += 1000;
			} else {
				// message timers
				setTimeout(() => {
					resultShow.message = resultAttackResultEffect(eff, oppo);
				}, sleep.value);
				sleep.value += 1000;
				// p2 HP reduce
				for (let i = 0; i < move.damage * eff; i++) {
					setTimeout(() => {
						players.p2Hp--;
					}, i);
				}
			}
			setTimeout(() => {
				resultShow.show = false;
				resultShow.message = "";
			}, sleep.value);
			sleep.value += 2000;
		}, sleep.value);
	}
}
