<script setup lang="ts">
// @ts-nocheck
import { OrbitControls, GLTFModel, vLog } from "@tresjs/cientos";
import * as THREE from "three";
</script>
<script lang="ts">
export default {
	name: "three-d",
};
</script>
<template>
	<div class="three-d">
		<TresCanvas clear-color="#88F">
			<TresPerspectiveCamera :position="[0, 0, 5]" />
			<OrbitControls :enable-zoom="false" :enable-rotate="false" />
			<TresMesh
				:rotation="[Math.PI / 3, 0, 0]"
				:position="[-2, -2, 0]"
				receive-shadow
			>
				<TresPlaneGeometry :args="[2, 2, 2, 2]" />
				<TresMeshBasicMaterial color="#0f0" />
			</TresMesh>
			<TresMesh :position="[2, 2, 0]" :rotation="[0, Math.PI, 0]">
				<TresConeGeometry :args="[1, 1.5, 3]" />
				<TresMeshToonMaterial color="#82DBC5" />
			</TresMesh>
			<TresMesh
				:rotation="[-Math.PI / 2.2, 0, 0]"
				:position="[2, 0, 0]"
				receive-shadow
			>
				<TresPlaneGeometry :args="[2, 2, 2, 2]" />
				<TresMeshBasicMaterial color="#0f0" />
			</TresMesh>
			<!-- <Suspense>
				<GLTFModel
					path="/planet.gltf"
					:position="[-2, 0, 0]"
					v-log
					cast-shadow
				/>
			</Suspense> -->
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
	border: 10px solid red;
	width: fit-content;
	height: 270px;
	margin: 0px;
}
</style>