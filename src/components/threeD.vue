<script lang="ts">
import { OrbitControls, GLTFModel, FBXModel, vLog } from "@tresjs/cientos";
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
		FBXModel,
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
	fairyTypes,
	fireTypes,
	grassTypes,
	waterTypes,
} from "./../data/pokemons";
import {
	posAdd,
	resultAttackResultEffect,
	Pokemon,
	pokemonAI,
	PokemonMove,
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
let team = [fairyTypes.gardevoir, grassTypes.venasaur, waterTypes.wartortle];
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
		} else if (focusedNo.value == 3) {
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
			focusedNo.value = 3;
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
			focused.value =
				document.getElementsByClassName("moves")[focusedNo.value];
			focused.value?.focus();
		}, 500);
	}
};
let sleep = ref(1000);
// players
let players = reactive({
	p1: team[2],
	p1Hp: 200,
	p2Hp: 200,
	p2: grassTypes.venasaur,
});
let HPs = computed(() => {
	return {
		p1: players.p1Hp / 2,
		p2: players.p2Hp / 2,
	};
});
let resultShow = reactive({
	message: "",
	show: false,
});
let usingMove = ref(false);
function fight(move: PokemonMove) {
	usingMove.value = true;
	resultShow.show = true;
	resultShow.message = `${players.p1.name} used ${move.moveName}`;
	let eff = attackResultEffect(move, players.p2);
	if (eff * move.damage > players.p2Hp) {
		// p2 HP 0
		for (let i = 0; i < players.p2Hp; i++) {
			setTimeout(() => {
				players.p2Hp--;
			}, i);
		}
		// message timers
		setTimeout(() => {
			resultShow.message = resultAttackResultEffect(eff, players.p2);
		}, sleep.value);
		sleep.value += 1000;
		setTimeout(() => {
			resultShow.message = `Opposing ${players.p2.name} fainted`;
		}, sleep.value);
		sleep.value += 1000;
		setTimeout(() => {
			resultShow.message = `Your ${players.p1.name} is the winner!`;
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
			resultShow.message = resultAttackResultEffect(eff, players.p2);
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
		if (players.p2Hp > 0) {
			let p2moves = players.p2.moves;
			let randomMove = p2moves[pokemonAI(players.p2, players.p1)];
			let eff2 = attackResultEffect(randomMove, players.p1);
			setTimeout(() => {
				resultShow.message = `Opposing ${players.p2.name} used ${randomMove.moveName}`;
			}, 2000);
			sleep.value += 1000;
			if (eff2 * randomMove.damage > players.p1Hp) {
				// p1 HP 0
				for (let i = 0; i < players.p1Hp; i++) {
					setTimeout(() => {
						players.p1Hp--;
					}, i);
				}
				// message timers
				setTimeout(() => {
					resultShow.message = resultAttackResultEffect(
						eff2,
						players.p1
					);
				}, sleep.value);
				sleep.value += 1000;
				setTimeout(() => {
					resultShow.message = `Your ${players.p1.name} fainted`;
				}, sleep.value);
				sleep.value += 1000;
				setTimeout(() => {
					resultShow.message = `Opposing ${players.p2.name} is the winner!`;
				}, sleep.value);
				sleep.value += 1000;
				setTimeout(() => {
					resultShow.show = false;
					resultShow.message = "";
				}, sleep.value);
				sleep.value += 1000;
			} else {
				// p1 HP reduce
				for (let i = 0; i < eff2 * randomMove.damage; i++) {
					setTimeout(() => {
						players.p1Hp--;
					}, i);
				}
				// message timers
				setTimeout(() => {
					resultShow.message = resultAttackResultEffect(
						eff2,
						players.p1
					);
					usingMove.value = false;
				}, sleep.value);
				sleep.value += 1000;
				setTimeout(() => {
					resultShow.show = false;
					resultShow.message = "";
				}, sleep.value);
				sleep.value += 1000;
			}
		}
		sleep.value = 1000;
	}, sleep.value);
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
		name: "Bag",
		img: pokeball,
		onclick: () => {
			console.log("Not available yet");
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
					:disabled="usingMove"
					@click="fight(move)"
					:class="'w-full moves ' + move.moveType"
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
							@click="() => (players.p1 = poke)"
							class="pokemon-btn"
						>
							<img src="/pokeball.png" class="pokeball" />
							<div class="pokemon-name">{{ poke.name }}</div>
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
					class="w-full menu-opt"
					v-for="(option, i) in menuOptions"
					:key="i"
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
}
.pokemon-btn {
	display: flex;
	flex-direction: row;
	height: 7vh;
	width: 100%;
	background-color: white;
}
.pokemon-btn:focus {
	border: 2px solid seagreen;
}
.pokemon-btn:hover {
	border: 0;
}
.pokemon-btn:hover:focus {
	border: 2px solid seagreen;
	outline: 0px;
}
.switch-pokemon {
	position: absolute;
	z-index: 2;
	height: 80vh;
	width: 70vw;
	bottom: 10vh;
	right: 15vw;
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}
.switch-pokemon > div:first-child {
	padding: 5vh 5vw;
	gap: 5vh 0;
	display: flex;
	color: black;
	background: tomato;
	flex-direction: column;
}
.switch-pokemon > div:nth-child(2) {
	width: 100%;
	gap: 5vh 0;
	background: lightgray;
	padding: 5vh 5vw;
	display: flex;
	flex-direction: column;
}
.switch-pokemon .moves {
	background: white;
	color: black;
	border-radius: 50px;
}
.switch-pokemon .moves .move-type {
	height: 3vh;
	width: auto;
}
.switch-pokemon .moves .move-name-box + div {
	align-items: center;
}
.switch-pokemon .moves .move-name-box {
	text-align: left;
}
.switch-pokemon .moves .move-name-box div:nth-child(2) {
	font-weight: normal;
}
.switch-pokemon .moves .move-name-box .move-name {
	font-weight: bolder;
}

.switch-pokemon .moves div:nth-child(2) {
	display: flex;
	gap: 0 10px;
	font-weight: bolder;
	flex-direction: row;
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
	border: 0px solid transparent;
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
</style>