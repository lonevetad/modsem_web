<template>
	<div>
		<!--
		<SearchableDropdown :elements="elemSearch"></SearchableDropdown>
		-->
		<ProcedureSearchForm :queryResultsStore="queryResultsStore"></ProcedureSearchForm>
		<div class="listDetailContainer">
			<ProcMepListResult
				:queryResultsStore="queryResultsStore"
				class="listResults"
				v-on:show-procedure="onSelectingProcedure"
			></ProcMepListResult>
			<ProcDetail :queryResultsStore="queryResultsStore" class="procDetail"></ProcDetail>
		</div>
		<button @click="testtt()">test</button>
		<button @click="allIndividuals()">All Individuals</button>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-class-decorator";
import { State } from "vuex-class";
import ModSemAPI from "@/api";
import { queryResultsStore } from "@/vuex"
import { ProcedureSearchForm } from "@/components";
import { ProcMepListResult } from "@/components";
import { SearchableDropdown } from "@/components";
import { ProcDetail } from "@/components/procDetail";
import { Procedure, Document } from "@/store/queryResultsStore";
import { Client } from 'virtuoso-sparql-client';

// TODO : 

@Component({
	components: {
		SearchableDropdown,
		ProcedureSearchForm,
		ProcMepListResult,
		ProcDetail
	}
})
export default class SearchPage extends Vue {
	@State("API") API!: ModSemAPI;
	queryResultsStore = queryResultsStore; // to pass and retrive queries

	get computedInfo(): string {
		return "Computed" + " ahahah " + "about";
	}
	get elemSearch(): string[] {
		return ['vaff', 'dalla', 'Duff']
	}
	onSelectingProcedure(p: Procedure): void {
		// TODO
		console.log("selected: " + p.title);


		var response = {
			"head": {
				"link": [],
				"vars": [
					"date_str",
					"status_str",
					"url_str",
					"c"
				]
			},
			"results": {
				"distinct": false,
				"ordered": true,
				"bindings": [
					{
						"date_str": {
							"type": "literal",
							"value": "04/09/2019"
						},
						"status_str": {
							"type": "literal",
							"value": "Proposal"
						},
						"url_str": {
							"type": "literal",
							"value": "https://www.europarl.europa.eu/RegData/docs_autres_institutions/commission_europeenne/com/2019/0396/COM_COM(2019)0396_EN.pdf"
						},
						"c": {
							"type": "uri",
							"value": "http://www.semanticweb.org/european_union#PERSON_Adina_V\u0103lean"
						},
						"type": {
							"type": "literal",
							"value": "http://www.semanticweb.org/european_union#CommissionDocument"
						}
					},
					{
						"date_str": {
							"type": "literal",
							"value": "24/10/2019"
						},
						"status_str": {
							"type": "literal",
							"value": "FirstLecture"
						},
						"url_str": {
							"type": "literal",
							"value": "http://register.consilium.europa.eu/content/out?lang=EN&typ=SET&i=ADV&RESULTSET=1&DOC_ID=[%n4]%2F19&DOC_LANCD=EN&ROWSPP=25&NRROWS=500&ORDERBY=DOC_DATE+DESC"
						},
						"c": {
							"type": "uri",
							"value": "http://www.semanticweb.org/european_union#PERSON_Charles_Michel"
						},
						"type": {
							"type": "literal",
							"value": "http://www.semanticweb.org/european_union#CommissionDocument"
						}
					},
					{
						"date_str": {
							"type": "literal",
							"value": "24/09/2019"
						},
						"status_str": {
							"type": "literal",
							"value": "FirstLecture"
						},
						"url_str": {
							"type": "literal",
							"value": "https://www.europarl.europa.eu/doceo/document/TA-9-2019-0037_EN.html"
						},
						"c": {
							"type": "uri",
							"value": "http://www.semanticweb.org/european_union#PERSON_Karima_DELLI"
						},
						"type": {
							"type": "literal",
							"value": "http://www.semanticweb.org/european_union#CommissionDocument"
						}
					}
				]
			}
		};
		var documents = response.results.bindings;
		var i = -1, len = documents.length;
		// find 
		//var selectedProcedure: Procedure = this.queryResultsStore.selectedProcedure as Procedure;
		var docWellStructured: Document[] = [];
		while (++i < len) {
			var x = documents[i];
			var d: Document = {
				date: x.date_str.value, // new Date(x.date_str.value),
				type: x.type.value,
				status: x.status_str.value,
				url: x.url_str.value,
				authorUrl: x.c.value,
				authorDetails: "temporary null"
			};
			docWellStructured.push(d);
		}
		this.queryResultsStore.setDocumentsOfSelProc(docWellStructured);
	}

	testtt(): void {
		const dbPediaClient = new Client('http://localhost:8890/sparql');
		const prefixes = { "eu": "http://www.semanticweb.org/european_union#" };
		const graph = "http://www.semanticweb.org/DAV/european_union";
		dbPediaClient.setOptions(
			"application/json"
			//"PREFIX eu: <http://www.semanticweb.org/european_union#>"
			//			, { "myprefix": "http://www.myschema.org/ontology/" }, "http://www.myschema.org/resource/"
			, prefixes, graph
			//, { "ex": "http://www.semanticweb.org/european_union#" }, "http://www.semanticweb.org/european_union"
		);
		var queryToTest = [
			//"select ?p where {?p rdf:type owl:NamedIndividual}", // FUNZIONAAAAAAAHHHH quindi la tolgo
			"select ?id_str ?title_str ?status_str ?type ?p where {?p rdf:type ?type; " +//
			"dc:identifier ?i; " +//
			"dc:title ?t; " +//
			"eu:status ?s. " +//
			"?type rdfs:subClassOf ?x. " +//
			"?x rdfs:subClassOf eu:Procedure. " +//
			"BIND (STR(?i) AS ?id_str). " +//
			"BIND (STR(?t) AS ?title_str). " +//
			"BIND (STR(?s) AS ?status_str). }"//
			,
		];
		queryToTest.forEach((v: string, i: number, a: string[]) => {
			dbPediaClient.query(v).then((results: any) => {
				console.log("\n\ngot a result: from query");
				console.log(v);
				console.log("-----now print the result");
				console.log(results);
				console.log(results.results);
				console.log(results.results.bindings);
			}).catch((err: any) => {
				console.log("\nERROOOOOOORRR on query:");
				console.log(v);
				console.log("-----now print the error");
				console.log(err);
				console.log("\n\n");
			});
		})
	}

	allIndividuals(): void {
		this.API.allIndividualsInOntology().then(response => {
			console.log("\n\n\n ALL INDIVIDUALS\n\n__________")
			console.log(response);
			console.log(response.results.bindings);
			console.log("#################################")
		}).catch(err => {
			console.log("Error on loadProcedures");
			console.log(err);
		});
	}
}
</script>

<style lang="scss" scoped>
.listResults {
	width: 40%;
}
.procDetail {
	width: 60%;
}
.listDetailContainer {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;

	border-style: solid;
	border-width: 2px;
	border-color: #88aacc;
}
</style>