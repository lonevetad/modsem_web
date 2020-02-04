<template>
	<div>
		<SearchableDropdown
			id="nationSearch"
			:elements="nationsAsName"
			v-on:element-selected="onSelectingNation"
			class="searchDropdown"
		></SearchableDropdown>
		<br />
		<label for="showNation">Will be another Searchable Dropdown, but now just show the element</label>
		<input type="text" id="showNation" v-model="nation" />
		<br />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-class-decorator";

@Component({})
export default class MepSearchForm extends Vue {
	nation: string = "Italy";
	private natAsName: string[] = [];
	onSelectingNation(selection: { id: number; selectedElement: string }): void {
		console.log("onSelectingNation: " + selection.selectedElement)
		this.nation = selection.selectedElement;
	}

	get nations(): { id: string; name: string }[] {
		// TODO MOCKED
		var a = [
			{ id: "AT", name: "Austria" },
			{ id: "BE", name: "Belgium" },
			{ id: "BG", name: "Bulgaria" },
			{ id: "HR", name: "Croatia" },
			{ id: "CY", name: "Cyprus" },
			{ id: "CZ", name: "Czechia" },
			{ id: "DK", name: "Denmark" },
			{ id: "EE", name: "Estonia" },
			{ id: "FI", name: "Finland" },
			{ id: "FR", name: "France" },
			{ id: "DE", name: "Germany" },
			{ id: "GB", name: "Great Britain" }, // due to the current timestamp we refers to
			{ id: "GR", name: "Greece" },
			{ id: "IE", name: "Ireland" },
			{ id: "IT", name: "Italy" },
			{ id: "LV", name: "Latvia" },
			{ id: "LU", name: "Luxembourg" },
			{ id: "MT", name: "Malta" },
			{ id: "NL", name: "Netherlands" },
			{ id: "PL", name: "Poland" },
			{ id: "PT", name: "Portugal" },
			{ id: "RO", name: "Romania" },
			{ id: "SK", name: "Slovakia" },
			{ id: "SI", name: "Slovenia" },
			{ id: "SP", name: "Spain" },
			{ id: "SE", name: "Sweden" },
			{ id: "LT", name: "Lithuania" },
			//rip: { id: "ML", name: "Holland" },
		];
		return a;
	}

	get nationsAsName(): string[] {
		//if (this.natAsName.length == 0) {
		var nn = this.nations;
		var i = -1, len = nn.length;
		var a = new Array<string>(len);
		while (++i < len) a[i] = nn[i].name;
		//this.natAsName = a;
		return a;
		/*} else {
			console.log("IS emmpty at nationsAsName")
			return this.natAsName;
		}*/
	}

	get nationsAsJSON(): string {
		var a: { id: string; name: string }[] = this.nations;
		console.log("AAAAAAH " + JSON.stringify(a));
		var s = "[";
		var i = -1,
			len = a.length;
		var x: { id: string; name: string };
		while (++i < len) {
			x = a[i];
			if (i > 0) {
				s = s + ",";
			}
			s = s + "{id: '" + x.id + "', name: '" + x.name + "'}";
		}
		s = s + "]";
		return s;
	}
}
</script>

<style lang="scss" scoped>
</style>