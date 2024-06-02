<script setup lang="ts">
// @ts-nocheck
import { OrbitControls, GLTFModel, vLog } from "@tresjs/cientos";
import * as THREE from "three";

let gl = {
	shadows: true,
	shadowMapType: THREE.BasicShadowMap,
	outputColorSpace: THREE.SRGBColorSpace,
	toneMapping: THREE.NoToneMapping,
};
</script>
<script lang="ts">
export default {
	name: "three-d",
};
</script>
<template>
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