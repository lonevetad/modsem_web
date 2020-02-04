<template>
	<div>
		<button @click="goToHome()">Homepage</button>
		<button @click="goTo('search')">Go to search!</button>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-class-decorator";

@Component({})
export default class Navbar extends Vue {
	goToHome(): void {
		this.$router.push({
			name: "home"
		});
	}

	goTo(url: string): void {
		this.$router.push({
			name: url
		});
	}
}
</script>
<style lang="scss" scoped>
</style>