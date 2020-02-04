//import axios, { AxiosRequestConfig } from "axios";
import ModSemAPI, { VirtuosoQueryConnectionOptions } from "./api";
import { ProcedureAPI, ProceduresListResponse } from "./procedure";

export type DataValue = { //as returned in JSONs
    type: string;
    value: string;
}

export {
    //VirtuosoQueryConnectionOptions,
    ProcedureAPI, ProceduresListResponse
}
export default ModSemAPI;