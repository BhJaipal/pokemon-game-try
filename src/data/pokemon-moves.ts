import { PokemonMove } from "../utils/types";

// fire type
const fire = {
	ember: new PokemonMove("Ember", "fire", 40),
	blastBurn: new PokemonMove("Blast Burn", "fire", 150),
	flameBurst: new PokemonMove("Flame Burst", "fire", 70),
	inferno: new PokemonMove("Inferno", "fire", 100),
	blazeKick: new PokemonMove("Blaze Kick", "fire", 90),
	flareBlitz: new PokemonMove("Flare Blitz", "fire", 120),
	pyroBall: new PokemonMove("Pyro Ball", "fire", 120),
	eruption: new PokemonMove("Eruption", "fire", 150),
	willOut: new PokemonMove("Will-O-Wisp", "fire", 90),
	flamethrower: new PokemonMove("Flamethrower", "fire", 80),
	fireBlast: new PokemonMove("Fire Blast", "fire", 110),
};

// grass types done
const grass = {
	razorLeaf: new PokemonMove("Razor Leaf", "grass", 55),
	vineWhip: new PokemonMove("Vine Whip", "grass", 45),
	chloroblast: new PokemonMove("Chloroblast", "grass", 150),
	energyBall: new PokemonMove("Energy Ball", "grass", 90),
	frenzyPlant: new PokemonMove("Frenzy Plant", "grass", 150),
	leafStorm: new PokemonMove("Leaf Storm", "grass", 130),
	petalDance: new PokemonMove("Petal Dance", "grass", 120),
	solarBeam: new PokemonMove("Solar Beam", "grass", 120),
	petalBlizzard: new PokemonMove("Petal Blizzard", "grass", 90),
	leafBlade: new PokemonMove("Leaf Blade", "grass", 90),
	woodHammer: new PokemonMove("Wood Hammer", "grass", 120),
};

// water types done
const water = {
	waterGun: new PokemonMove("Water Gun", "water", 40),
	waterPulse: new PokemonMove("Water Pulse", "water", 60),
	waterShuriken: new PokemonMove("Water Shuriken", "water", 75),
	hydroPump: new PokemonMove("Hydro Pump", "water", 100),
	surf: new PokemonMove("Surf", "water", 90),
	waterfall: new PokemonMove("Waterfall", "water", 80),
	hydroCannon: new PokemonMove("Hydro Cannon", "water", 110),
	aquaTail: new PokemonMove("Aqua Tail", "flying", 90),
};

// dragon types done
const dragon = {
	dragonRush: new PokemonMove("Dragon Rush", "dragon", 100),
	dragonTail: new PokemonMove("Dragon Tail", "dragon", 60),
	dragonPulse: new PokemonMove("Dragon Pulse", "dragon", 85),
	dragonClaw: new PokemonMove("Dragon Claw", "dragon", 80),
	dragonBreath: new PokemonMove("Dragon Breath", "dragon", 60),
	dracoMeteor: new PokemonMove("Draco Meteor", "dragon", 100),
	outrage: new PokemonMove("Outrage", "dragon", 90),
	breakingSwipe: new PokemonMove("Breaking Swipe", "dragon", 60),
};
// ice types done
const ice = {
	iceBeam: new PokemonMove("Ice Beam", "ice", 90),
	blizzard: new PokemonMove("Blizzard", "ice", 110),
	icePunch: new PokemonMove("Ice Punch", "ice", 75),
	icicleCrash: new PokemonMove("Icicle Crash", "ice", 85),
	iceFang: new PokemonMove("Ice Fang", "ice", 65),
};

// flying types done
const flying = {
	fly: new PokemonMove("Fly", "flying", 90),
	oblivionwing: new PokemonMove("Oblivion Wing", "flying", 80),
	braveBird: new PokemonMove("Brave Bird", "flying", 120),
	aerialAce: new PokemonMove("Aerial Ace", "flying", 60),
	aeroblast: new PokemonMove("Aeroblast", "flying", 100),
	acrobatics: new PokemonMove("Acrobatics", "flying", 55),
	airSlash: new PokemonMove("Air Slash", "flying", 75),
};
// electric types done
const electric = {
	thunder: new PokemonMove("Thunder", "electric", 110),
	thunderbolt: new PokemonMove("Thunderbolt", "electric", 90),
	thunderPunch: new PokemonMove("Thunder Punch", "electric", 75),
	thunderWave: new PokemonMove("Thunder Wave", "electric", 90),
	thunderShock: new PokemonMove("Thunder Shock", "electric", 40),
	chargeBeam: new PokemonMove("Charge Beam", "electric", 50),
	thunderFang: new PokemonMove("Thunder Fang", "electric", 65),
	discharge: new PokemonMove("Discharge", "electric", 80),
	overdrive: new PokemonMove("Overdrive", "electric", 80),
	zapCannon: new PokemonMove("Zap Cannon", "electric", 120),
};
// normal types done
const normal = {
	skullBash: new PokemonMove("Skull Bash", "normal", 130),
	doubleSlap: new PokemonMove("Double-Edge", "normal", 120),
	tackle: new PokemonMove("Tackle", "normal", 40),
	explosion: new PokemonMove("Explosion", "normal", 250),
	hyperBeam: new PokemonMove("Hyper Beam", "normal", 150),
	doubleEdge: new PokemonMove("Double-Edge", "normal", 120),
	scratch: new PokemonMove("Scratch", "normal", 40),
	bodySlam: new PokemonMove("Body Slam", "normal", 85),
};
// fighting types done
const fighting = {
	rockSmash: new PokemonMove("Rock Smash", "fighting", 40),
	auraSphere: new PokemonMove("Aura Sphere", "fighting", 80),
	closeCombat: new PokemonMove("Close Combat", "fighting", 120),
	PowerUpPunch: new PokemonMove("Power-Up Punch", "fighting", 40),
	superPower: new PokemonMove("Super Power", "fighting", 120),
	karateChop: new PokemonMove("Karate Chop", "fighting", 50),
	doubleKick: new PokemonMove("Double Kick", "fighting", 30),
	flyingPress: new PokemonMove("Flying Press", "fighting", 100),
};
// poison types done
const poison = {
	poisonPowder: new PokemonMove("Poison Powder", "poison", 75),
	sludgeBomb: new PokemonMove("Sludge Bomb", "poison", 90),
	sludgeWave: new PokemonMove("Sludge Wave", "poison", 95),
	poisonJab: new PokemonMove("Poison Jab", "poison", 80),
	poisonSting: new PokemonMove("Poison Sting", "poison", 35),
	toxicSpikes: new PokemonMove("Toxic Spikes", "poison", 90),
	poisonFang: new PokemonMove("Poison Fang", "poison", 65),
	sludge: new PokemonMove("Sludge", "poison", 65),
	poisonGas: new PokemonMove("Poison Gas", "poison", 90),
	venoshock: new PokemonMove("Venoshock", "poison", 100),
	crossPoison: new PokemonMove("Cross Poison", "poison", 70),
};
// ground types done
const ground = {
	earthquake: new PokemonMove("Earthquake", "ground", 100),
	mudShot: new PokemonMove("Mud Shot", "ground", 55),
	mudBomb: new PokemonMove("Mud Bomb", "ground", 65),
	earthPower: new PokemonMove("Earth Power", "ground", 90),
	sandsearStorm: new PokemonMove("Sandsear Storm", "ground", 100),
	dig: new PokemonMove("Dig", "ground", 80),
	highHorsepower: new PokemonMove("High Horsepower", "ground", 95),
	thousandArrows: new PokemonMove("Thousand Arrows", "ground", 90),
};
// psychic types done
const psychic = {
	dreamEater: new PokemonMove("Dream Eater", "psychic", 100),
	psychic: new PokemonMove("Psychic", "psychic", 90),
	photonGeyser: new PokemonMove("Photon Geyser", "psychic", 90),
	psychoCut: new PokemonMove("Psycho Cut", "psychic", 70),
	psyshock: new PokemonMove("Psyshock", "psychic", 80),
	psychoBoot: new PokemonMove("Psycho Boost", "psychic", 140),
};
// bug types done
const bug = {
	bugBuzz: new PokemonMove("Bug Buzz", "bug", 100),
	megahorn: new PokemonMove("Megahorn", "bug", 120),
	furyCutter: new PokemonMove("Fury Cutter", "bug", 40),
	xScissor: new PokemonMove("X-Scissor", "bug", 80),
	UTurn: new PokemonMove("U-turn", "bug", 70),
	leechLife: new PokemonMove("Leech Life", "bug", 80),
};
// rock types done
const rock = {
	rockThrow: new PokemonMove("Rock Throw", "rock", 50),
	rockSlide: new PokemonMove("Rock Slide", "rock", 75),
	rockTomb: new PokemonMove("Rock Tomb", "rock", 60),
	ancientPower: new PokemonMove("Ancient Power", "rock", 60),
	stoneEdge: new PokemonMove("Stone Edge", "rock", 100),
	headSmash: new PokemonMove("Head Smash", "rock", 150),
	powerGem: new PokemonMove("Power Gem", "rock", 80),
	meteorBeam: new PokemonMove("Meteor Beam", "rock", 120),
};
// ghost types done
const ghost = {
	shadowBall: new PokemonMove("Shadow Ball", "ghost", 80),
	shadowClaw: new PokemonMove("Shadow Claw", "ghost", 70),
	shadowBone: new PokemonMove("Shadow Bone", "ghost", 85),
	shadowForce: new PokemonMove("Shadow Force", "ghost", 120),
	phantomForce: new PokemonMove("Phantom Force", "ghost", 90),
	astralBarage: new PokemonMove("Astral Barrage", "ghost", 120),
};
// dark types done
const dark = {
	darkPulse: new PokemonMove("Dark Pulse", "dark", 80),
	fieryWrath: new PokemonMove("Fiery Wrath", "dark", 90),
	brutalSwing: new PokemonMove("Brutal Swing", "dark", 60),
	nightSlash: new PokemonMove("Night Slash", "dark", 70),
	DarkestLariat: new PokemonMove("Darkest Lariat", "dark", 100),
	crunch: new PokemonMove("Crunch", "dark", 80),
	falseSurrender: new PokemonMove("False Surrender", "dark", 80),
	baddyBad: new PokemonMove("Baddy Bad", "dark", 120),
};

// steel types done
const steel = {
	flashCannon: new PokemonMove("Flash Cannon", "steel", 80),
	steelBeam: new PokemonMove("Steel Beam", "steel", 140),
	ironTail: new PokemonMove("Iron Tail", "steel", 100),
	metalClaw: new PokemonMove("Metal Claw", "steel", 50),
	meteorMash: new PokemonMove("Meteor Mash", "steel", 90),
	steelWing: new PokemonMove("Steel Wing", "steel", 90),
	gigatonHammer: new PokemonMove("Gigaton Hammer", "steel", 200),
};
// fairy types done
const fairy = {
	dazzlingGleam: new PokemonMove("Dazzling Gleam", "fairy", 80),
	moonblast: new PokemonMove("Moonblast", "fairy", 95),
	disarmingVoice: new PokemonMove("Disarming Voice", "fairy", 40),
	fairyWind: new PokemonMove("Fairy Wind", "fairy", 40),
	fleurCannon: new PokemonMove("Fleur Cannon", "fairy", 130),
	lightOfRuin: new PokemonMove("Light of Ruin", "fairy", 140),
	playRough: new PokemonMove("Play Rough", "fairy", 90),
	mistyExplosion: new PokemonMove("Misty Explosion", "fairy", 100),
	magicalTorque: new PokemonMove("Magical Torque", "fairy", 80),
};
export {
	fire,
	water,
	grass,
	electric,
	ice,
	fighting,
	poison,
	ground,
	flying,
	psychic,
	bug,
	rock,
	ghost,
	dragon,
	dark,
	steel,
	fairy,
	normal,
};
