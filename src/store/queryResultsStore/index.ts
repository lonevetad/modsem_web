import { createModule, action, mutation, getter } from "vuex-class-component";
import { VuexModuleOptions } from 'vuex-class-component/dist/interfaces';

const VuexModule = createModule({
    namespaced: "queryResuls", // TODO scegliere un nome migliore
    strict: false,
} as VuexModuleOptions);

//

export type Author = {
    firstName: string;
    lastName: string;
}
export type Mep = Author & {
    urlHomePage: string;
    urlPhoto: string;
}
// TODO fare altri "Author & cose", tipo magistrato, etc

export type Document = {
    date: string; //Date;
    type: string;
    status: string;
    url: string;
    authorUrl: string; //hidden variable to fetch authorDetail
    authorDetails: string; // mix of author + another query's result in parenthesis (example: Gentiloni(Economy) )
}
export type Procedure = {
    id: string;
    title: string;
    type: string;
    status: string;
    url: string;
    documents: Document[];
}

//

export default class QueryResultsStore extends VuexModule {
    private _isQueryingProcedures: boolean = true;
    private _procedures: Procedure[] = [];
    // todo for meps
    private _selectedProcedure: Procedure | null = null;
    private _documentsOfSelProc: Document[] = [];

    //

    get isQueryingProcedures(): boolean {
        return this._isQueryingProcedures;
    }

    get procedures(): Procedure[] {
        return [...this._procedures];
    }


    get selectedProcedure(): Procedure | null {
        return this._selectedProcedure;
    }

    get documentsOfSelProc(): Document[] {
        return this._documentsOfSelProc;
    }


    //

    @action async setProcedures(ps: Procedure[]): Promise<void> {
        this._procedures = [...ps];
    }

    @action async setSelectedProcedure(p: Procedure): Promise<void> {
        this._selectedProcedure = p;
    }
    @action async setDocumentsOfSelProc(ds: Document[]): Promise<void> {
        if (this.selectedProcedure != null)
            (this.selectedProcedure as Procedure).documents = ds;
        this._documentsOfSelProc = ds;
    }

    /**
     *  @action async add(todo: Todo): Promise<void> {
        this.todos = [...this.todos, todo];
    }
    */
}