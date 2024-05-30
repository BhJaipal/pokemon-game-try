import { Pokemon } from "../utils/types";
import * as moves from "./pokemon-moves";

export const fireTypes = {
	charmender: new Pokemon("fire", "Charmender", [
		moves.normal.scratch,
		moves.normal.tackle,
		moves.fire.ember,
	]),
	charmeleon: new Pokemon("fire", "Charmeleon", [
		moves.fire.flamethrower,
		moves.fire.flareBlitz,
		moves.normal.scratch,
		moves.normal.tackle,
	]),
	charizard: new Pokemon("fire", "Charizard", [
		moves.fire.flamethrower,
		moves.fire.fireBlast,
		moves.dragon.dragonClaw,
		moves.flying.fly,
	]),
};
export const grassTypes = {
	bulbasaur: new Pokemon("grass", "Bulbasaur", [
		moves.grass.vineWhip,
		moves.grass.razorLeaf,
		moves.normal.bodySlam,
		moves.normal.tackle,
	]),
	ivysaur: new Pokemon("grass", "Ivysaur", [
		moves.poison.poisonPowder,
		moves.grass.vineWhip,
		moves.grass.razorLeaf,
		moves.grass.leafStorm,
	]),
	venasaur: new Pokemon("grass", "Venasaur", [
		moves.grass.chloroblast,
		moves.grass.petalBlizzard,
		moves.grass.solarBeam,
		moves.poison.sludgeBomb,
	]),
};
export const waterTypes = {
	squirtle: new Pokemon("water", "Squirtle", [
		moves.water.waterGun,
		moves.water.waterPulse,
		moves.normal.tackle,
	]),
	wartortle: new Pokemon("water", "Wartortle", [
		moves.water.waterGun,
		moves.normal.skullBash,
		moves.water.waterPulse,
		moves.normal.tackle,
	]),
	blastoise: new Pokemon("water", "Blastoise", [
		moves.water.hydroPump,
		moves.water.hydroCannon,
		moves.water.surf,
		moves.water.aquaTail,
	]),
};
