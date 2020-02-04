<template>
	<div>
		<div class="searchDropdown">
			<button @click="toggleShow()" class="buttonSearch">Search</button>
			<!--
			-->
			<div :class="classesDropdownList">
				<input type="text" placeholder="Search.." v-model="filter" />
				<div v-if="elements != null" class="queriedListContainer">
					<ul class="queriedList">
						<li v-for="(e, i) in filteredElements" v-bind:key="i">
							<a @click="setSelectedFilter(i, e)">{{e}}</a>
							<br />
						</li>
						<!--
				<button @click=" updateFilter() " class="search">Search</button>
					<input type="text" placeholder="Search.." @keyup="updateFilter()" />
					id="myInput"

				<a v-for="(i, e) in elementsFiltered" v-bind:key="i" v-on:click="setSelectedFilter(i, e)">{{e}}</a>
						-->
					</ul>
				</div>
				<div v-else>nothing to show</div>
			</div>

			<slot></slot>HELLO WORLD
		</div>
	</div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from "vue-class-decorator";

/**
 * Exposes the query result via emitting the event "element-selected",
 * which must be listened on the parent component by adding the following
 * "v-on:element-selected=\"myFuncListener\"" on this Component tag.
 * To prolerly pass data (i.e. the "selectedElement: string"), the
 * listener function "myFuncListener" MUST accept a parameter.
 * This parameter must accept a plain object composed this way:
 * "{index: number, selectedElement: string}".
*/
@Component({})
export default class SearchableDropdown extends Vue {
	isShowing: boolean = false;
	private AAAAAAAAAAAAAAAAAAA_Mutex: boolean = true;
	filter: string = "";
	@Prop({ default: [] }) elements: string[] | undefined;
	elementsFiltered: string[] = ["hello", "world"];

	constructor(qualcosa: any) {
		super(qualcosa);
		//thi
	}
	toggleShow(): void {
		if (this.AAAAAAAAAAAAAAAAAAA_Mutex) {
			console.log("toggleShow 3")
			this.AAAAAAAAAAAAAAAAAAA_Mutex = false;
			this.isShowing = !this.isShowing;
			this.AAAAAAAAAAAAAAAAAAA_Mutex = true;
		}
	}


	get classesDropdownList(): string {
		let c = "dropdown-content";
		if (this.isShowing) c = c + " showMe";
		else c = c + " hideMe";
		console.log("classesDropdownList w")
		return c;
	}

	/*
		*/
	get filteredElements(): string[] {
		// TODO
		console.log("updateFilter")
		if (this.elements == null || this.elements === undefined) return [];
		const f = this.filter;
		if ((f === " " || f == "") && (this.elementsFiltered != this?.elements)) {
			//this.elementsFiltered = this?.elements as string[];
			return this.elements as string[];
		} else {
			/*let filtered = this.elements.filter((v, i, allElems) => {
				console.log(v)
				return v.includes(f);
			});*/
			let filtered: string[] = [];
			let i = -1, len =
				this.elements.length, ff;
			ff = f.toLowerCase();
			while (++i < len) {
				let v = this.elements[i].toLowerCase();
				if (v.includes(ff)) filtered.push(this.elements[i]);
			}
			if (filtered != null && this.elementsFiltered != filtered)
				this.elementsFiltered = filtered as string[];
			//return this.elementsFiltered;
			return filtered;
		}
	}

	setSelectedFilter(i: number, elem: string): void {
		console.log("setSelectedFilter: " + elem)
		let selection: DDElementSelection = {
			index: i,
			selectedElement: elem
		};
		this.$emit("element-selected", selection);
	}
}


/**
 * Helper type to create elements used of the "Autocomplete" class belonging to the
 * "vuejs-auto-complete" module.
*/
export type ElementAutocomplete = {
	id: string;
	name: string;
}
/**
 * Type describing a selection, emitted upon selection via event "element-selected".
 * Should have been a "type", but TypeScript is not working properly.
*/
export type DDElementSelection = { index: number; selectedElement: string };
/* trials, keep for history BUT TODO MUST BE REMOVED
export interface DDElementSelection { index: number; selectedElement: string };
export class DDElementSelection {
  public index: number = -1;
  public selectedElement: string = "";
}
*/



</script>


<style lang="scss" scoped>
li {
	list-style: none;
}
.showMe {
	visibility: visible;
}
.hideMe {
	visibility: hidden;
}

.searchDropdown {
	/*
	position: relative;
	display: inline-block;
	display: inline-flex;
	overflow: visible;
	border-style: solid;
	border-width: 2px;
	border-color: #88aacc;
	*/
	min-width: 50px;
	min-width: 25px;
	min-height: 20px;
	width: 100px;
	height: 25px;
	max-height: 400px;
	max-width: 150px;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	flex-shrink: 1;
	justify-content: flex-start;
	align-content: flex-start;
}
.dropdown-content {
	/*
  display: none;
	position: absolute;
	overflow: unset;
	overflow-y: auto;
	border: 1px solid #ddd;
	position: relative;
	flex-shrink: 1;
  */
	height: 100px;
	min-width: inherit;
	min-height: 50px;
	width: inherit;
	max-height: 400px;
	max-width: inherit;
	left: 0px;
	top: 0px;
	background-color: #f6f6f6;
	z-index: 1;
}
.dropdown-content > input {
	height: 20px;
}
.buttonSearch {
	/*
  position: relative;
	left: 0px;
	top: 0px;
  */
	width: 100%;
	height: 100%;
}
.queriedList {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-content: flex-start;
	overflow: hidden;
	padding: 0px;
}
.queriedListContainer {
	overflow: auto;
	max-width: inherit;
	max-height: 200px;
	position: relative;
	left: 0px;
	top: 0px; //-15px;
	height: 70%;
	margin: 5px;
}
.queriedListContainer > * {
	position: inherit;
}
</style>