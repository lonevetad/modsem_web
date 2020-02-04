<template>
	<div>
		<br />
		<!--
		<label for="dateCreationProc">Creation date:</label>
		<input type="date" id="dateCreationProc" v-model="date" />
		<label for="dateCreationProc">Creation date:</label>
		<input type="date" id="dateCreationProc" v-model="date" />
		<label for="nationSearch">Nation:</label>
		<input type id="nation" v-model="date" />
		<autocomplete id="nationSearch" :source="nationsAsJSON" @selected="onSelectingNation"></autocomplete>
		
		-->
		<button @click="loadProcedures()">Search Procedures</button>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-class-decorator";
import { State } from "vuex-class";
import { queryResultsStore } from "@/vuex";
import { SearchableDropdown, ElementAutocomplete } from "@/components/searchableDropdown"; // NOTE ! è FONDAMENTALE MANTENERE "searchableDropdown" SENNò ESPLODE MALAMENTE
import { Procedure } from '@/store/queryResultsStore';
import ModSemAPI, { DataValue, ProceduresListResponse } from "@/api";


/*
import SearchableDropdown from "@/components/searchableDropdown";
//import { SearchableDropdown } from "@/components/searchableDropdown";
//import { DDElementSelection }  from "@/components/searchableDropdown";
import DDElementSelection from "@/components/searchableDropdown";
*/


@Component({
	components: {
		SearchableDropdown
	}
})
export default class ProcedureSearchForm extends Vue {
	@State("API") API!: ModSemAPI;
	@Prop({}) queryResultsStore = queryResultsStore;
	// query parameters
	title: string = "";
	//availableNations: string[] = []; // fill with API-call, data from a configuration file or embedded data
	type: string = ""; // as like as "availableNations"
	/**
	 * unused:
	date: Date = new Date();
	 */

	get procedureStatus(): string[] {
		return ["first lecture", "second lecture", "third lecture", "approved", "rejected"];
	}

	get procedureType(): string[] {
		return ["ordinary legislative", "special legislative", "bugdetory"];
	}

	/*
	mouned() {
		console.log("lolling:\n\t" + this.nationsAsJSON);
	}*/

	loadProcedures(): void {
		var a = [];
		this.API.getProcedureEndpoint().queryProcedures().then(response => {
			console.log("\n\n\n EUREKAAAAAA\n\n__________")
			console.log(response);
			this.processSuccessfullResponseProcedures(response);
		}).catch(err => {
			console.log("Error on loadProcedures");
			console.log(err);
		});
	}

	loadProcedures_OLD_WORKING(): void {
		let result = {
			"head": {
				"link": [],
				"vars": [
					"id_str",
					"title_str",
					"status_str",
					"type",
					"p"
				]
			},
			"results": {
				"distinct": false,
				"ordered": true,
				"bindings": [{
					"id_str": {
						"type": "literal",
						"value": "BUD2019/2213"
					},
					"title_str": {
						"type": "literal",
						"value": "Guidelines for the 2021 budget - Section III"
					},
					"status_str": {
						"type": "literal",
						"value": "Proposal"
					},
					"type": {
						"type": "uri",
						"value": "http://www.semanticweb.org/european_union#BudgetaryProcedure"
					},
					"p": {
						"type": "uri",
						"value": "http://www.semanticweb.org/european_union#PROC_BUD2019%2F2213"
					}
				},
				{
					"id_str": {
						"type": "literal",
						"value": "CNS2019/0807"
					},
					"title_str": {
						"type": "literal",
						"value": "Agreement on cooperation between Eurojust and Serbia"
					},
					"status_str": {
						"type": "literal",
						"value": "FirstLecture"
					},
					"type": {
						"type": "uri",
						"value": "http://www.semanticweb.org/european_union#SpecialProcedure"
					},
					"p": {
						"type": "uri",
						"value": "http://www.semanticweb.org/european_union#PROC_CNS2019%2F0807"
					}
				},
				{
					"id_str": {
						"type": "literal",
						"value": "COD2019/0179"
					},
					"title_str": {
						"type": "literal",
						"value": "Ensuring basic road freight and air connectivity: periods of application"
					},
					"status_str": {
						"type": "literal",
						"value": "Adopted"
					},
					"type": {
						"type": "uri",
						"value": "http://www.semanticweb.org/european_union#OrdinaryProcedure"
					},
					"p": {
						"type": "uri",
						"value": "http://www.semanticweb.org/european_union#PROC_COD2019%2F0179"
					}
				},
				{
					"id_str": {
						"type": "literal",
						"value": "COD2020/0006"
					},
					"title_str": {
						"type": "literal",
						"value": "Just Transition Fund"
					},
					"status_str": {
						"type": "literal",
						"value": "Proposal"
					},
					"type": {
						"type": "uri",
						"value": "http://www.semanticweb.org/european_union#OrdinaryProcedure"
					},
					"p": {
						"type": "uri",
						"value": "http://www.semanticweb.org/european_union#PROC_COD2020%2F0006"
					}
				}
				]
			}
		};
		this.processSuccessfullResponseProcedures(result);
	}
	processSuccessfullResponseProcedures(response: ProceduresListResponse): void {
		let procedures = response.results.bindings;
		var i = -1, len = procedures.length;
		// find 
		var procWellStructured: Procedure[] = [];
		console.log("LEN: " + len);
		while (++i < len) {
			var x = procedures[i];
			var p: Procedure = {
				id: x.id_str.value,
				title: x.title_str.value,
				type: x.type.value,
				status: x.status_str.value,
				url: x.p.value,
				documents: []
			};
			procWellStructured.push(p);
		}
		this.queryResultsStore.setProcedures(procWellStructured);
	}

}
</script>


<style lang="scss" scoped>
li {
	list-style-type: none;
}
.searchDropdown {
	min-width: 100px;
	min-height: 25px;
	width: 100px;
	display: flex;
	/*
  */
	border-style: solid;
	border-width: 2px;
	border-color: #88aacc;
}
label,
label > * {
	min-width: 25px;
	min-height: 20px;
}
</style>