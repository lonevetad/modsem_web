<template>
	<div>
		<button @click="goToAbout()">Go to About!</button>
		<br />
	</div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-class-decorator";

import { listQI } from "@/vuex";

@Component({})
export default class HomePage extends Vue {
	listQI = listQI;

	mounted(): void {
		console.log("mounted");
	}

	get computedInfo(): string {
		return "Computed" + " " + "example";
	}

	goToAbout(): void {
		this.$router.push({
			name: "about"
		});
	}

}
</script>
<style lang="scss" scoped>
</style>