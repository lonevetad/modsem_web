<template>
	<div>
		<div
			v-if="selectedProcedure != null"
			v-on:show-procedure="onSelectingProcedure"
			class="procDetailContainer"
		>
			<div>ID: {{selectedProcedure.id}}</div>
			<div>Title: {{selectedProcedure.title}}</div>
			<div>Type: {{extractType(selectedProcedure.type)}}</div>
			<div>Status: {{selectedProcedure.status}}</div>
			<div>
				<h3>Documents:</h3>
				<br />
				<table class="documentsTable">
					<tr>
						<th>Date</th>
						<th>Status</th>
						<th>Type</th>
						<th>URL</th>
						<th>Author</th>
					</tr>
					<!-- -->
					<tr v-for="(doc,i) in selectedProcedure.documents" v-bind:key="i">
						<td>{{doc.date}}</td>
						<td>{{doc.status}}</td>
						<td>{{extractType(doc.type)}}</td>
						<td>
							<a :href="doc.url" target="_blank">[]</a>
						</td>
						<td>{{extractAuthor(doc)}}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-class-decorator";
import { queryResultsStore } from "@/vuex";
import { Procedure, Document } from "@/store/queryResultsStore";

@Component({})
export default class ProcDetail extends Vue {
	@Prop({}) queryResultsStore = queryResultsStore;


	get selectedProcedure(): Procedure | null {
		return this.queryResultsStore.selectedProcedure;
	}

	goTo(url: string): void {
		this.$router.push({
			name: url
		});
	}
	onSelectingProcedure(p: Procedure): void {
		// TODO tanto non va
		console.log("selected: " + p.title);
	}

	extractAuthor(d: Document): string {
		return d.authorDetails;
	}
	extractType(t: string): string {
		return t.substr(t.lastIndexOf('#') + 1);
	}

	queryDocuments(p: Procedure) {

	}

}
</script>
<style lang="scss" scoped>
.procDetailContainer {
	border-color: black;
	border-style: solid;
	border-width: 1px;
}
table,
th,
td {
	border: 1px solid black;
}
</style>