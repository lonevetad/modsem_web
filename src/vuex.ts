import Vue from "vue";
import Vuex, { Store } from "vuex";
import ListStore, { QueryResultListStore, QueryResultItem } from "@/store/listQueryItem";
import QueryResultsStore /**/, { Procedure, Document } from "@/store/queryResultsStore";
import { extractVuexModule, createProxy } from 'vuex-class-component';
import { RootState } from '@/store/';

Vue.use(Vuex);

const store = new Store({
  state: new RootState(),
  modules: {
    ...extractVuexModule(ListStore),
    ...extractVuexModule(QueryResultsStore),
  },
});

const listQI = createProxy(store, ListStore);
const queryResultsStore = createProxy(store, QueryResultsStore);


//QueryResultListStore
export default store;
export { listQI, queryResultsStore };
// export {Procedure, Document} //sarà utile?
