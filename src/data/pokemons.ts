import { Pokemon } from "../utils/types";
import * as moves from "./pokemon-moves";

export const fireTypes = {
	charmander: new Pokemon(
		"fire",
		"Charmander",
		[moves.normal.scratch, moves.normal.tackle, moves.fire.ember],
		[0.1, 0.1, 0.1],
		[-2, 0, 0],
		"/fire/charmander.glb",
		{
			hp: 39,
			speed: 65,
		}
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
		[0.14, 0.14, 0.14],
		[-2, 0.47, 0],
		"/fire/charmeleon.glb",
		{
			hp: 58,
			speed: 80,
		}
	),
	charizard: new Pokemon(
		"fire",
		"Charizard",
		[
			moves.fire.flamethrower,
			moves.electric.thunderPunch,
			moves.dragon.dragonClaw,
			moves.flying.fly,
		],
		[0.05, 0.05, 0.05],
		[-2, 0, 0],
		"/fire/charizard.glb",
		{
			hp: 78,
			speed: 100,
		}
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
		[0.08, 0.08, 0.08],
		[-2, 0, 0],
		"/grass/bulbasaur.glb",
		{
			hp: 45,
			speed: 45,
		}
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
		[0.008, 0.008, 0.008],
		[-1.5, 0, 0],
		"/grass/ivysaur.glb",
		{
			hp: 60,
			speed: 60,
		}
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
		[0.035, 0.035, 0.035],
		[-2, 0, 0],
		"/grass/venusaur.glb",
		{
			hp: 80,
			speed: 80,
		}
	),
};
export const waterTypes = {
	squirtle: new Pokemon(
		"water",
		"Squirtle",
		[moves.water.waterGun, moves.water.waterPulse, moves.normal.tackle],
		[0.12, 0.12, 0.12],
		[-2, 0.28, 0],
		"/water/squirtle.glb",
		{
			hp: 44,
			speed: 43,
		}
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
		[0.13, 0.13, 0.13],
		[-2, 0.38, 0],
		"/water/wartortle.glb",
		{
			hp: 59,
			speed: 58,
		}
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
		[0.05, 0.05, 0.05],
		[-2, 0, 0],
		"/water/blastoise.glb",
		{
			hp: 79,
			speed: 78,
		}
	),
};
export const fairyTypes = {
	gardevoir: new Pokemon(
		["fairy", "psychic"],
		"Gardevoir",
		[
			moves.psychic.psychic,
			moves.fairy.dazzlingGleam,
			moves.fairy.moonblast,
			moves.ghost.shadowBall,
		],
		[0.05, 0.05, 0.05],
		[-2, 0, 0],
		"/water/blastoise.glb",
		{
			hp: 68,
			speed: 80,
		}
	),
};
export const dragonTypes = {
	garchomp: new Pokemon(
		["dragon", "ground"],
		"Garchomp",
		[
			moves.dragon.dragonClaw,
			moves.rock.rockTomb,
			moves.dragon.dragonRush,
			moves.ground.earthquake,
		],
		[0.05, 0.05, 0.05],
		[-2, 0, 0],
		"/water/blastoise.glb",
		{
			hp: 108,
			speed: 102,
		}
	),
};
