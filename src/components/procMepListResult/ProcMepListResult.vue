<template>
	<div>
		<table class="listResultsContainer">
			<tr>
				<th>ID</th>
				<th>Title</th>
			</tr>
			<!-- -->
			<tr v-for="(proc,i) in allProcedures" v-bind:key="i">
				<td>
					<a @click="loadProcedureDetails(proc)">{{proc.id}}</a>
				</td>
				<td>
					<a @click="loadProcedureDetails(proc)">{{proc.title}}</a>
				</td>
			</tr>
		</table>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-class-decorator";
import { queryResultsStore } from "@/vuex";
import { Procedure } from "@/store/queryResultsStore";

@Component({})
export default class ProcMepListResult extends Vue {
	@Prop({}) queryResultsStore = queryResultsStore;
	procedureFieldsToShow: string[] = ["id", "title", "type", "status"]
	//

	get allProcedures(): Procedure[] {
		return this.queryResultsStore.procedures;
	}

	loadProcedureDetails(p: Procedure): void {
		// TODO
		var url: string = p.url;
		this.queryResultsStore.setSelectedProcedure(p);
		this.$emit("show-procedure", p);
	}
}
</script>

<style lang="scss" scoped>
.listResultsContainer {
	width: 100%;
}
.listResultsContainer > td {
	border-block-color: gray;
	border-style: solid;
	border-width: 1px;
}
table,
th,
td {
	border: 1px solid black;
}
</style>