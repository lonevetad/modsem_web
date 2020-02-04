/*export * from "./procedureSearchForm";
export * from "./navbar";
export * from "./searchableDropdown";
*/

// TODO fare la stessa cosa PER OGNI ALTRO component

import { SearchableDropdown, ElementAutocomplete, DDElementSelection } from "./searchableDropdown";
import { Navbar } from "./navbar";
import { ProcedureSearchForm } from "./procedureSearchForm";
import { ProcMepListResult } from "./procMepListResult";
import { ProcDetail } from "./procDetail";

export {
    Navbar,
    ProcedureSearchForm,
    ProcMepListResult,
    ProcDetail,
    //
    SearchableDropdown,
    ElementAutocomplete,
    DDElementSelection
}