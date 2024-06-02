<script setup lang="ts">
// @ts-nocheck
import { OrbitControls } from "@tresjs/cientos";
import { useFBX } from "@tresjs/cientos";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";

import { useGLTF, useTweakPane } from "@tresjs/cientos";
import { useRenderLoop } from "@tresjs/core";
import { shallowRef, watch } from "vue";

const { scene: planet } = await useGLTF(
	"https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/low-poly/planet.gltf"
);

const { pane } = useTweakPane();

const planetRef = shallowRef();

planet.traverse((child) => {
	if (child.isMesh) {
		child.receiveShadow = true;
	}
});

watch(
	() => planetRef.value,
	(planet) => {
		if (!planet) return;
		pane.addInput(planetRef.value, "visible", { label: "Planet" });
	}
);

const { onLoop } = useRenderLoop();

onLoop(({ delta }) => {
	if (!planet) return;
	planet.rotation.y += delta * 0.04;
	planet.rotation.z += delta * 0.02;
	planet.rotation.x += delta * 0.05;
	planet.updateMatrixWorld();
});
</script>
<script lang="ts">
export default {
	name: "three-d",
};
</script>
<template>
	<div class="three-d">
		<!--
			// let scene = new THREE.Scene();
// let loader = new FBXLoader();
// loader.load("/Charizard/CharizardMegaX.FBX", function (object) {
// 	scene.add(object);
// });

		-->
		<TresCanvas clear-color="#88F">
			<TresPerspectiveCamera :position="[0, 0, 5]" />
			<OrbitControls :enable-zoom="false" />
			<primitive :object="model" />
			<TresMesh ref="planetRef" v-bind="planet" />
			<TresMesh :rotation="[Math.PI / 3, 0, 0]" :position="[-2, -2, 0]">
				<TresCircleGeometry :args="[0.7, 32]" />
				<TresMeshBasicMaterial color="#0f0" />
			</TresMesh>
			<TresMesh :rotation="[-Math.PI / 2.2, 0, 0]" :position="[2, 0, 0]">
				<TresCircleGeometry :args="[0.7, 32]" />
				<TresMeshBasicMaterial color="#0f0" />
			</TresMesh>
			<!-- <TresMesh v-bind="scene" /> -->
		</TresCanvas>
	</div>
</template>
<style scoped>
.three-d {
	border: 10px solid red;
	width: fit-content;
	height: 270px;
	margin: 0px;
}
</style>