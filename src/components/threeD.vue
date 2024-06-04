<script lang="ts">
import { OrbitControls, GLTFModel, FBXModel, vLog } from "@tresjs/cientos";
import { attackResultEffect, howMuchEffective } from "./../utils/pokemon-types";
export default {
	name: "three-d",
	directives: {
		vLog,
	},
	components: {
		OrbitControls,
		GLTFModel,
		FBXModel,
	},
	methods: { attackResultEffect, howMuchEffective },
};
</script>
<script setup lang="ts">
// @ts-nocheck
import { ref } from "vue";
import * as THREE from "three";
import { fireTypes, waterTypes } from "./../data/pokemons";

let gl = {
	shadows: true,
	shadowMapType: THREE.BasicShadowMap,
	outputColorSpace: THREE.SRGBColorSpace,
	toneMapping: THREE.NoToneMapping,
};

let players = ref({
	p1: fireTypes.charizard,
	p2: waterTypes.blastoise,
});
</script>
<template>
	<div class="bg-transparent game-ui">
		<div class="options">
			<button
				v-for="(move, i) in players.p1.moves"
				:key="i"
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
		</div>
	</div>
	<div class="three-d">
		<TresCanvas clear-color="#88F" v-bind="gl">
			<TresPerspectiveCamera
				:position="[0, 0, 5]"
				:rotation="[0, 0, 0]"
			/>
			<OrbitControls :enable-zoom="false" :enable-rotate="false" />
			<TresMesh
				:rotation="[-Math.PI / 2, Math.PI / 36, -Math.PI / 2.5]"
				:position="[-2, -1.5, 0]"
				receive-shadow
			>
				<TresPlaneGeometry :args="[1.7, 1.7]" />
				<TresMeshBasicMaterial color="#0f0" />
			</TresMesh>
			<TresMesh :position="[2, 1.5, 0]" :rotation="[0, Math.PI, 0]">
				<TresConeGeometry :args="[1, 1.5, 3]" />
				<TresMeshToonMaterial color="#82DBC5" />
			</TresMesh>
			<TresMesh
				:rotation="[-Math.PI / 2.2, 0, 0]"
				:position="[2, 0, 0]"
				receive-shadow
			>
				<TresPlaneGeometry :args="[2, 2, 2, 2]" color="#0f0" />
				<TresMeshBasicMaterial color="#0f0" />
			</TresMesh>
			<Suspense>
				<GLTFModel
					path="/planet.gltf"
					:position="[-2, 0, 0]"
					v-log
					cast-shadow
				/>
			</Suspense>
			<TresDirectionalLight
				:position="[0, 1, 0]"
				:intensity="1"
				cast-shadow
			/>
			<TresAmbientLight :intensity="0.5" />
		</TresCanvas>
	</div>
</template>
<style scoped>
.options {
	border: 2px solid transparent;
	width: 15vw;
	height: calc(28vh + 20px * 3);
	gap: 20px;
	display: grid;
	grid-template-rows: repeat(4, minmax(0, 1fr));
	bottom: 5vh;
	position: fixed;
	right: 5vh;
	border-image-slice: 1;
}
.three-d {
	width: 100vw;
	height: 100vh;
	margin: 0px;
	position: static;
	z-index: 0;
}

.game-ui {
	width: 100vw;
	height: 100vh;
	margin: 0px;
	position: absolute;
	z-index: 1;
}

@keyframes moveGradient {
	50% {
		background-position: 100% 50%;
	}
}

.moves {
	border-image: radial-gradient(to bottom right, #ff0000, #00ff00) 1;
	border: 2px solid transparent;
	background-color: aliceblue;
	color: black;
	border-image: inherit;
	position: relative;
	display: flex;
	border-radius: 3px;
}
.moves::after {
	--border-width: 5px;
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
	border-radius: calc(2 * var(--border-width));
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
</style>