<script setup lang="ts">
import { TresCanvas, useRenderLoop } from "@tresjs/core";
import { reactive, shallowRef } from "vue";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { OrbitControls } from "@tresjs/cientos";

const gl = reactive({
	clearColor: "#82DBC5",
	shadows: true,
	alpha: false,
	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
});

const { onLoop } = useRenderLoop();

const boxRef = shallowRef<{ rotation: { y: number; z: number } } | null>(null);

onLoop(({ elapsed }) => {
	if (boxRef.value !== null) {
		boxRef.value.rotation.y = elapsed;
		boxRef.value.rotation.z = elapsed;
	}
});
</script>
<script lang="ts">
export default {
	name: "three-d",
};
</script>
<template>
	<TresCanvas v-bind="gl" class="three-d">
		<TresPerspectiveCamera :position="[5, 5, 5]" />
		<OrbitControls />
		<TresAmbientLight :intensity="0.5" :color="'red'" />
		<TresMesh ref="boxRef" :position="[0, 2, 0]">
			<TresBoxGeometry :args="[1, 1, 1]" />
			<TresMeshNormalMaterial />
		</TresMesh>
		<TresDirectionalLight
			:position="[0, 2, 4]"
			:intensity="1"
			cast-shadow
		/>
		<TresAxesHelper />
		<TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
	</TresCanvas>
</template>
<style scoped>
.three-d {
	width: 1000px;
	height: 700px;
}
</style>