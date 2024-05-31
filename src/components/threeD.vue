<script setup lang="ts">
// @ts-nocheck
import { OrbitControls, Circle } from "@tresjs/cientos";
import { vLog } from "@tresjs/core";
import { shallowRef } from "vue";
const boxRef = shallowRef();
</script>
<script lang="ts">
export default {
	name: "three-d",
};
</script>
<template>
	<div class="three-d">
		<TresCanvas window-size>
			<TresPerspectiveCamera :position="[0, 0, 5]" />
			<OrbitControls />
			<Circle :args="[1, 32]" v-log:material :position="[-5, -5, 0]" />"
		</TresCanvas>
	</div>
</template>
<style scoped>
.three-d {
	border: 10px solid red;
	width: fit-content;
	height: 270px;
}
</style>