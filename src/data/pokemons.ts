import { Pokemon } from "../utils/types";
import * as moves from "./pokemon-moves";

export const fireTypes = {
	charmander: new Pokemon(
		"fire",
		"Charmander",
		[moves.normal.scratch, moves.normal.tackle, moves.fire.ember],
		[0.01, 0.01, 0.01],
		[-2, -1.5, 0],
		"/fire/charmander.glb"
	),
	charmeleon: new Pokemon(
		"fire",
		"Charmeleon",
		[
			moves.fire.flamethrower,
			moves.fire.flareBlitz,
			moves.normal.scratch,
			moves.normal.tackle,
		],
		[0.3, 0.3, 0.3],
		[-2, -0.5, 0],
		"/fire/charmeleon.glb"
	),
	charizard: new Pokemon(
		"fire",
		"Charizard",
		[
			moves.fire.flamethrower,
			moves.fire.fireBlast,
			moves.dragon.dragonClaw,
			moves.flying.fly,
		],
		[0.05, 0.05, 0.05],
		[-2, -1.5, 0],
		"/fire/charizard.glb"
	),
};
export const grassTypes = {
	bulbasaur: new Pokemon(
		"grass",
		"Bulbasaur",
		[
			moves.grass.vineWhip,
			moves.grass.razorLeaf,
			moves.normal.bodySlam,
			moves.normal.tackle,
		],
		[0.2, 0.2, 0.2],
		[-2, -1.5, 0],
		"/grass/bulbasaur.glb"
	),
	ivysaur: new Pokemon(
		"grass",
		"Ivysaur",
		[
			moves.poison.poisonPowder,
			moves.grass.vineWhip,
			moves.grass.razorLeaf,
			moves.grass.leafStorm,
		],
		[0.01, 0.01, 0.01],
		[-1.8, -1.55, -0.5],
		"/grass/ivysaur.glb"
	),
	venasaur: new Pokemon(
		"grass",
		"Venasaur",
		[
			moves.grass.chloroblast,
			moves.grass.petalBlizzard,
			moves.grass.solarBeam,
			moves.poison.sludgeBomb,
		],
		[0.03, 0.03, 0.03],
		[-2, -1.5, 0],
		"/grass/venusaur.glb"
	),
};
export const waterTypes = {
	squirtle: new Pokemon(
		"water",
		"Squirtle",
		[moves.water.waterGun, moves.water.waterPulse, moves.normal.tackle],
		[0.2, 0.2, 0.2],
		[-2, -1.05, 0],
		"/water/squirtle.glb"
	),
	wartortle: new Pokemon(
		"water",
		"Wartortle",
		[
			moves.water.waterGun,
			moves.normal.skullBash,
			moves.water.waterPulse,
			moves.normal.tackle,
		],
		[0.2, 0.2, 0.2],
		[-2, -0.9, 0],
		"/water/wartortle.glb"
	),
	blastoise: new Pokemon(
		"water",
		"Blastoise",
		[
			moves.water.hydroPump,
			moves.water.hydroCannon,
			moves.water.surf,
			moves.water.aquaTail,
		],
		[0.1, 0.1, 0.1],
		[-2, -1.5, 0],
		"/water/blastoise.glb"
	),
};
