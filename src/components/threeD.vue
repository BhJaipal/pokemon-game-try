<script lang="ts">
import { OrbitControls, GLTFModel, vLog } from "@tresjs/cientos";
import { attackResultEffect, howMuchEffective } from "./../utils";
import { TresCanvas } from "@tresjs/core";
export default {
	name: "three-d",
	directives: {
		vLog,
	},
	components: {
		OrbitControls,
		GLTFModel,
		TresCanvas,
	},
	methods: { attackResultEffect, howMuchEffective },
};
</script>
<script setup lang="ts">
import pokeball from "./../assets/pokeball-neon.png";
import { computed, onMounted, reactive, ref, watch } from "vue";
import * as THREE from "three";
import {
	dragonTypes,
	fairyTypes,
	fireTypes,
	grassTypes,
	waterTypes,
} from "./../data/pokemons";
import {
	posAdd,
	Pokemon,
	PokemonMove,
	resultAttackResultEffect,
	pokemonAI,
} from "./../utils";

let gl = {
	shadows: true,
	alpha: false,
	shadowMapType: THREE.BasicShadowMap,
	outputColorSpace: THREE.SRGBColorSpace,
	toneMapping: THREE.NoToneMapping,
};
let focusedNo = ref(0);
let focused = ref<null | HTMLButtonElement>(null);
onMounted(() => {
	// @ts-ignore
	focused.value =
		document.getElementsByClassName("menu-opt")[focusedNo.value];
	focused.value?.focus();
});
let team = [
	fairyTypes.gardevoir,
	grassTypes.venasaur,
	waterTypes.blastoise,
	dragonTypes.garchomp,
	fireTypes.charizard,
];
// moves use
let movesUseResult = reactive<string[]>([]);
let resultCounter = ref(0);
watch(movesUseResult, () => {
	if (movesUseResult.length != 0) {
		setTimeout(() => {
			resultShow.show = true;
			resultShow.message = movesUseResult.shift() as string;
		}, (resultCounter.value / 4) * 1000);
	} else {
		resultShow.show = false;
		resultShow.message = "";
	}
});
document.onkeydown = (e: KeyboardEvent) => {
	if (e.key == "Enter" || e.key == "a") {
		focused.value?.click();
		if (
			switchPoke.value &&
			focused.value?.classList.contains("pokemon-btn")
		) {
			switchPoke.value = false;
			focusedNo.value = 0;
			setTimeout(() => {
				// @ts-ignore
				focused.value =
					document.getElementsByClassName("moves")[focusedNo.value];
				focused.value?.focus();
			}, 300);
		}
		watch(usingMove, (val) => {
			if (val == false) {
				focused.value?.focus();
			}
		});
		if (focused.value?.classList.contains("moves")) {
		} else if (focused.value?.classList.contains("pokemon-btn")) {
		} else {
		}
	} else if (e.code == "ArrowDown") {
		if (switchPoke.value) {
			if (focusedNo.value == team.length - 1) {
				focusedNo.value = 0;
			} else {
				focusedNo.value++;
			}
			// @ts-ignore
			focused.value =
				document.getElementsByClassName("pokemon-btn")[focusedNo.value];
			focused.value?.focus();
			return;
		}
		if (movesShow.value && focusedNo.value == players.p1.moves.length - 1) {
			focusedNo.value = 0;
		} else if (focusedNo.value == 2) {
			focusedNo.value = 0;
		} else {
			focusedNo.value++;
		}
		// @ts-ignore
		focused.value =
			document.getElementsByClassName("moves")[focusedNo.value];
		focused.value?.focus();
		if (!movesShow.value) {
			// @ts-ignore
			focused.value =
				document.getElementsByClassName("menu-opt")[focusedNo.value];
			focused.value?.focus();
		}
	} else if (e.code == "ArrowUp") {
		if (switchPoke.value) {
			if (focusedNo.value == 0) {
				focusedNo.value = team.length - 1;
			} else {
				focusedNo.value--;
			}
			// @ts-ignore
			focused.value =
				document.getElementsByClassName("pokemon-btn")[focusedNo.value];
			focused.value?.focus();
			return;
		}
		if (focusedNo.value == 0 && movesShow.value) {
			focusedNo.value = players.p1.moves.length - 1;
		} else if (focusedNo.value == 0) {
			focusedNo.value = 2;
		} else {
			focusedNo.value--;
		}
		//@ts-ignore
		focused.value =
			document.getElementsByClassName("moves")[focusedNo.value];
		focused.value?.focus();
		if (!movesShow.value) {
			// @ts-ignore
			focused.value =
				document.getElementsByClassName("menu-opt")[focusedNo.value];
			focused.value?.focus();
		}
	} else if (e.key == "s") {
		movesShow.value = false;
		switchPoke.value = false;
		setTimeout(() => {
			// @ts-ignore
			focused.value = document.getElementsByClassName("menu-opt")[0];
			focused.value?.focus();
			focusedNo.value = 0;
		}, 200);
	}
};
let sleep = ref(1000);
// players
let players = reactive({
	p1: team[4],
	p2: grassTypes.venasaur,
});
let HPs = computed(() => {
	return {
		p1: (players.p1.stats.currectHP / players.p1.stats.hp) * 100,
		p2: (players.p2.stats.currectHP / players.p2.stats.hp) * 100,
	};
});
let resultShow = reactive({
	message: "",
	show: false,
});
let usingMove = computed(() => {
	return (
		movesUseResult.length != 0 &&
		!players.p1.stats.currectHP &&
		!players.p2.stats.currectHP
	);
});
// fight func
function fight(move: PokemonMove) {
	if (players.p1.stats.speed > players.p2.stats.speed) {
		attack2(move, players.p1, players.p2);
		setTimeout(() => {
			if (players.p2.stats.currectHP <= 0) return;
			let p2moves = players.p2.moves;
			let randomMove = p2moves[pokemonAI(players.p2, players.p1)];
			attack2(randomMove, players.p2, players.p1, true);
			resultCounter.value = 0;
		}, resultCounter.value * 1000);
	} else {
		let p2moves = players.p2.moves;
		let randomMove = p2moves[pokemonAI(players.p2, players.p1)];
		attack2(randomMove, players.p2, players.p1, true);
		setTimeout(() => {
			if (players.p1.stats.currectHP <= 0) return;
			attack2(move, players.p1, players.p2);
			resultCounter.value = 0;
		}, resultCounter.value * 1000);
	}
	sleep.value += 1000;
}
let movesShow = ref(false);
let pokemonSwitchFocus = computed<Pokemon | undefined>(() => {
	if (switchPoke.value) {
		let focusPoke = team.find(
			(el) => el.name == focused.value?.textContent
		);
		return focusPoke;
	}
	return undefined;
});
let switchPoke = ref(false);
let menuOptions = [
	{
		name: "Fight",
		img: pokeball,
		onclick: () => {
			movesShow.value = true;
			setTimeout(() => {
				// @ts-ignore
				focused.value =
					document.getElementsByClassName("moves")[focusedNo.value];
				focused.value?.focus();
			}, 500);
		},
	},
	{
		name: "Pokemon",
		img: pokeball,
		onclick: () => {
			switchPoke.value = true;
			setTimeout(() => {
				// @ts-ignore
				focused.value =
					document.getElementsByClassName("pokemon-btn")[0];
				focused.value?.focus();
			}, 300);
		},
	},
	{
		name: "Run",
		img: pokeball,
		onclick: () => {
			console.log("Not available yet");
		},
	},
];
function attack2(
	move: PokemonMove,
	poke: Pokemon,
	oppo: Pokemon,
	isOpponent = false
) {
	console.log(resultCounter.value);
	movesUseResult.push(
		`${isOpponent ? "Opposing " : ""}${poke.name} used ${move.moveName}`
	);
	resultCounter.value++;
	let eff = attackResultEffect(move, oppo);
	if (
		eff * move.damage >
		(isOpponent ? players.p1.stats.currectHP : players.p2.stats.currectHP)
	) {
		// p2 HP 0
		for (
			let i = 0;
			i <
			(isOpponent
				? players.p1.stats.currectHP
				: players.p2.stats.currectHP);
			i++
		) {
			setTimeout(() => {
				if (isOpponent) {
					players.p1.stats.currectHP--;
				} else {
					players.p2.stats.currectHP--;
				}
			}, i);
		}
		// message timers
		movesUseResult.push(resultAttackResultEffect(eff, oppo));
		resultCounter.value++;
		movesUseResult.push(
			`${isOpponent ? "Your" : "Oppenent's"} ${oppo.name} fainted`
		);
		resultCounter.value++;
		movesUseResult.push(
			`${isOpponent ? "Oppenent's" : "Your"} ${poke.name} is the winner!`
		);
		resultCounter.value++;
	} else {
		// message timers
		movesUseResult.push(resultAttackResultEffect(eff, oppo));
		resultCounter.value++;
		// p2 HP reduce
		for (let i = 0; i < move.damage * eff; i++) {
			setTimeout(() => {
				if (isOpponent) {
					players.p1.stats.currectHP--;
				} else {
					players.p2.stats.currectHP--;
				}
			}, i);
		}
	}
}
</script>
<template>
	<div class="three-d">
		<div class="attack-result" v-if="resultShow.show">
			{{ resultShow.message }}
		</div>
		<div class="options">
			<template v-if="movesShow && !switchPoke">
				<button
					v-for="(move, i) in players.p1.moves"
					:key="i"
					:disabled="!HPs.p1 && !HPs.p2"
					@click="!HPs.p1 || !HPs.p2 ? () => {} : fight(move)"
					:class="'w-full moves move-use ' + move.moveType"
				>
					<div>
						<img
							class="move-type"
							:src="'/types-icon/' + move.moveType + '.svg'"
							:alt="move.moveType"
						/>
					</div>
					<div class="flex flex-col move-name-box">
						<div class="move-name">{{ move.moveName }}</div>
						<div>
							{{
								howMuchEffective(
									attackResultEffect(move, players.p2)
								)
							}}
						</div>
					</div>
				</button>
			</template>
			<template v-else-if="switchPoke">
				<div class="switch-pokemon">
					<div>
						<button
							v-for="(poke, i) in team"
							:key="i"
							:disabled="poke.stats.currectHP <= 0"
							@click="() => (players.p1 = poke)"
							class="pokemon-btn move-use"
						>
							<img src="/pokeball.png" class="pokeball" />
							<div class="pokemon-name">
								<div>
									{{ poke.name }}
								</div>
								<v-progress-linear
									height="15"
									:value="
										poke.stats.currectHP / poke.stats.hp
									"
									color="rgba(255, 0, 0, 1)"
								/>
							</div>
						</button>
					</div>
					<div>
						<button
							v-for="(move, i) in pokemonSwitchFocus?.moves"
							:key="i"
							disabled
							:class="'w-full moves ' + move.moveType"
						>
							<div class="flex flex-col move-name-box">
								<div class="move-name">{{ move.moveName }}</div>
								<div>
									{{
										howMuchEffective(
											attackResultEffect(move, players.p2)
										)
									}}
								</div>
							</div>
							<div class="flex flex-col">
								<img
									class="move-type"
									:src="
										'/types-icon/' + move.moveType + '.svg'
									"
									:alt="move.moveType"
								/>
								<div class="font-extrabold">
									{{ move.moveType.toUpperCase() }}
								</div>
							</div>
						</button>
					</div>
				</div>
			</template>
			<template v-else>
				<button
					class="w-full menu-opt move-use"
					v-for="(option, i) in menuOptions"
					:key="i"
					:disabled="resultShow.show"
					@click="option.onclick"
				>
					<img :src="option.img" />
					<div>{{ option.name }}</div>
				</button>
			</template>
		</div>
		<div class="p1-hp" v-if="!switchPoke">
			<div>HP</div>
			<v-progress-linear
				v-model="HPs.p1"
				height="15"
				:color="HPs.p1 > 45 ? 'green' : HPs.p1 < 15 ? 'red' : 'yellow'"
			>
			</v-progress-linear>
		</div>
		<div class="p2-hp" v-if="!switchPoke">
			<div>HP</div>
			<v-progress-linear
				v-model="HPs.p2"
				height="15"
				:color="HPs.p2 > 45 ? 'green' : HPs.p2 < 15 ? 'red' : 'yellow'"
			>
			</v-progress-linear>
		</div>
		<TresCanvas clear-color="#88F" v-bind="gl" window-size>
			<TresPerspectiveCamera
				:position="[-3.5, 0.5, 3]"
				:rotation="[0, -Math.PI / 4, 0]"
			/>
			<OrbitControls :enable-zoom="false" :enable-rotate="false" />
			<!-- Player 1 -->
			<Suspense>
				<GLTFModel
					:path="players.p1.src"
					:position="players.p1.position"
					:scale="players.p1.scale"
					:rotation="[0, Math.PI / 2, 0]"
					v-bind="{ castShadow: true }"
					:cast-shadow="true"
				/>
			</Suspense>
			<!-- Player 2 -->
			<Suspense>
				<GLTFModel
					:path="players.p2.src"
					:position="posAdd(players.p2.position)"
					:scale="players.p2.scale"
					:rotation="[0, -Math.PI / 2, 0]"
					v-bind="{ castShadow: true }"
					:cast-shadow="true"
				/>
			</Suspense>
			<!-- Ground and Lights -->
			<TresMesh
				:rotation="[-Math.PI / 2, 0, 0]"
				:position="[0, 0, 0]"
				receive-shadow
			>
				<TresPlaneGeometry :args="[6, 2, 2, 2]" color="#0f0" />
				<TresMeshStandardMaterial color="#0f0" />
			</TresMesh>
			<TresDirectionalLight
				:position="[0, 2, 0]"
				:intensity="5"
				cast-shadow
			/>
			<TresAmbientLight :intensity="2" :position="[-2, 2, 0]" />
		</TresCanvas>
	</div>
</template>
<style scoped>
@import url(./../assets/css/poke-switch.css);
.options {
	border: 2px solid transparent;
	width: 15vw;
	margin-bottom: 3vh;
	margin-right: 2vw;
	height: calc(28vh + 20px * 3);
	gap: 20px;
	display: grid;
	grid-template-rows: repeat(4, minmax(0, 1fr));
	bottom: 5vh;
	position: fixed;
	right: 5vh;
	z-index: 1;
	position: absolute;
	border-image-slice: 1;
}
.three-d {
	width: 100vw;
	height: 100vh;
	margin: 0px;
	position: static;
	z-index: 0;
	overflow: hidden;
}
@keyframes moveGradient {
	50% {
		background-position: 100% 50%;
	}
}
.pokeball {
	width: auto;
	height: 5vh;
}
.pokemon-name {
	margin-left: 2vw;
	font-size: larger;
	font-weight: bolder;
	display: flex;
	flex-direction: column;
}
.pokemon-name {
	width: 10vw;
}
.pokemon-btn {
	display: flex;
	flex-direction: row;
	height: 7vh;
	width: 100%;
	background-color: white;
}
.pokemon-btn:focus {
	border: 0px;
	outline: 5px solid gold;
}
.pokemon-btn:hover {
	outline: 0;
}
.pokemon-btn:hover:focus {
	outline: 5px solid gold;
	border: 0px;
}

.attack-result {
	position: absolute;
	bottom: 0px;
	right: 0;
	height: 10vh;
	left: 0;
	width: 100%;
	z-index: 2;
	color: black;
	padding: 50px;
	text-align: left;
	font-size: large;
	background-color: bisque;
}
.p1-hp {
	position: absolute;
	z-index: 1;
	display: flex;
	width: 15vw;
	flex-direction: row;
	left: 25vw;
	font-size: x-small;
	margin-top: 30vh;
}
.p1-hp > div:first-child {
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
	padding-right: 10px;
	padding-left: 10px;
	font-weight: bold;
	background-color: darkblue;
}
.p1-hp > div:nth-child(2) {
	z-index: inherit;
	border-top-right-radius: 20px;
	border-bottom-right-radius: 20px;
}
.p2-hp > div:nth-child(2) {
	z-index: inherit;
	border-top-right-radius: 20px;
	border-bottom-right-radius: 20px;
}
.p2-hp > div:first-child {
	padding-left: 10px;
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
	padding-right: 10px;
	font-weight: bold;
	background-color: darkblue;
}
.p2-hp {
	position: absolute;
	z-index: 1;
	flex-direction: row;
	display: flex;
	width: 15vw;
	left: 57vw;
	font-size: x-small;
	margin-top: 35vh;
}
.menu-opt {
	background-color: white;
	font-size: larger;
	border: 0px solid transparent;
	color: black;
	border-image: inherit;
	text-align: left;
	font-weight: bolder;
	align-items: center;
	position: relative;
	display: flex;
	flex-direction: row-reverse;
	border-radius: 50px;
}
.menu-opt img {
	height: 3vh;
	width: auto;
	transform: rotate(45deg);
}
.menu-opt:focus img {
	height: 3vh;
	width: auto;
	filter: invert(1);
}
.menu-opt div {
	width: 100%;
}
.menu-opt:focus {
	background-color: rgba(0, 0, 0, 0.9);
	color: white;
}
.menu-opt:focus:after {
	background: linear-gradient(
		60deg,
		hsl(224, 100%, 48%),
		hsl(134, 85%, 0%),
		hsl(224, 100%, 48%),
		hsl(179, 85%, 0%),
		hsl(224, 85%, 66%)
	);
	--border-width: 3px;
	position: absolute;
	content: "";
	top: calc(-1.5 * var(--border-width));
	left: calc(-1.5 * var(--border-width));
	z-index: -1;
	width: calc(100% + var(--border-width) * 3);
	height: calc(100% + var(--border-width) * 3);
	background-size: 300% 300%;
	background-position: 0 50%;
	border: 0;
	border-radius: calc(15 * var(--border-width));
	animation: moveGradient 2s linear infinite;
}
.moves {
	background-color: aliceblue;
	color: black;
	border-image: inherit;
	position: relative;
	display: flex;
	border-radius: 5px;
}
.moves:focus::after {
	--border-width: 3px;
	position: absolute;
	content: "";
	top: calc(-1 * var(--border-width));
	left: calc(-1 * var(--border-width));
	z-index: -1;
	width: calc(100% + var(--border-width) * 2);
	height: calc(100% + var(--border-width) * 2);
	background: linear-gradient(
		60deg,
		hsl(224, 85%, 66%),
		hsl(269, 85%, 66%),
		hsl(314, 85%, 66%),
		hsl(359, 85%, 66%),
		hsl(44, 85%, 66%),
		hsl(89, 85%, 66%),
		hsl(134, 85%, 66%),
		hsl(179, 85%, 66%)
	);
	background-size: 300% 300%;
	background-position: 0 50%;
	border-radius: calc(1 * var(--border-width));
	animation: moveGradient 4s alternate infinite;
}
.move-name {
	font-weight: bolder;
}
.move-name-box {
	width: 100%;
	text-align: center;
}
.move-type {
	height: 4vh;
	float: left;
}
/* types color */
.flying {
	background-color: aqua;
}
.dragon {
	background-color: blueviolet;
}
.fire {
	background-color: coral;
}
.water {
	background-color: cornflowerblue;
}
.grass {
	background-color: yellowgreen;
}
.poison {
	background-color: slateblue;
}
.ghost {
	background-color: rebeccapurple;
}
.fairy {
	background-color: fuchsia;
}
.psychic {
	background-color: pink;
}
.ground {
	background-color: #b18006;
}
.rock {
	background-color: #b0a8a2;
}
.normal {
	background-color: white;
}
.electric {
	background-color: gold;
}
</style>