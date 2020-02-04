import { createModule, action, mutation, getter } from "vuex-class-component";
import { VuexModuleOptions } from 'vuex-class-component/dist/interfaces';

const VuexModule = createModule({
    namespaced: "listQI", // TODO scegliere un nome migliore
    strict: false,
} as VuexModuleOptions);

export interface QueryResultItem {
    id: number
}

//type Deputati extends QueryResultItem

export default class ListStore<T extends QueryResultItem> extends VuexModule {
    private result: T[] = [];
    
    get resultSize() : number {
        return this.result.length;
    }
    
    get results(): T[] {
        return [...this.result];
    }
    
    // TODO
    @mutation queryAll(url: string) : void {
        // do that goddamned query
        console.log(url);
    }
    
    
    /*
    @action async bicrement() : Promise<void> {
        this.incrVal += 2;
    }*/
}
export type QueryResultListStore = ListStore<QueryResultItem>;