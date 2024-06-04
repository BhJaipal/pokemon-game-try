<script lang="ts">
import { OrbitControls, GLTFModel, vLog } from "@tresjs/cientos";
export default {
	name: "three-d",
	directives: {
		vLog,
	},
	components: {
		OrbitControls,
		GLTFModel,
	},
};
</script>
<script setup lang="ts">
// @ts-nocheck
import { ref } from "vue";
import * as THREE from "three";
import { fireTypes, waterTypes } from "./../data/pokemons";
import { attackResultEffect, howMuchEffective } from "./../utils/pokemon-types";

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
	<div class="game-ui bg-transparent">
		<div class="options">
			<button
				v-for="(move, i) in players.p1.moves"
				:key="i"
				:class="'w-full moves ' + move.moveType"
			>
				<img
					class="move-type"
					:src="'/types-icon/' + move.moveType + '.svg'"
					:alt="move.moveType"
				/>
				<div class="flex flex-col">
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
@keyframes borderAnimation {
	0% {
		border-image: linear-gradient(
				to bottom right,
				#ff0000,
				#00ff00,
				#0000ff
			)
			1;
	}
	25% {
		border-image: linear-gradient(
				to bottom right,
				#00ff00,
				#00ff00,
				#00ff00,
				#00ff00,
				#0000ff
			)
			1;
	}
	50% {
		border-image: linear-gradient(
				to bottom right,
				#00ff00,
				#0000ff,
				#ff0000
			)
			1;
	}
	75% {
		border-image: linear-gradient(
				to bottom right,
				#ff0000,
				#ff0000,
				#ff0000,
				#ff0000,
				#00ff00
			)
			1;
	}
	100% {
		border-image: linear-gradient(
				to bottom right,
				#0000ff,
				#ff0000,
				#00ff00
			)
			1;
	}
}
.options {
	border: 2px solid transparent;
	width: 15vw;
	height: 28vh;
	display: grid;
	grid-template-rows: repeat(4, minmax(0, 1fr));
	bottom: 5vh;
	position: fixed;
	right: 5vh;
	border-image: radial-gradient(to bottom right, #ff0000, #00ff00) 1;
	border-image-slice: 1;
	animation: borderAnimation 1s linear infinite;
}
.moves {
	border: 2px solid transparent;
	background-color: aliceblue;
	color: black;
	border-image: inherit;
}
.move-name {
	font-weight: bolder;
}
.move-type {
	height: 3vh;
	float: left;
}
.flying {
	background-color: aqua;
}
.dragon {
	background-color: blueviolet;
}
</style>