import { DataValue } from "./index";
import { APIAdapter } from "./api";
import { Procedure, Document } from "@/store/queryResultsStore";

/**
 * Represents all hotel related endpoints.
 */
export class ProcedureAPI {
    /**
     * Represents the base URL of the api.
     */
    private baseURL: string;

    /**
     * Represents an adapter to the network layer.
     */
    private adapter: APIAdapter;



    /**
     * Creates a new instance of the UserAPI class,
     * bound to the specified endpoint.
     * @param URL The URL of the API endpoint.
     */
    constructor(URL: string, adapter: APIAdapter) {
        if (URL === "") {
            throw new Error("URL is not defined");
        }
        this.baseURL = URL; // use as it is `${URL}/Search`;
        this.adapter = adapter;
    }

    public async queryProcedures(
        title?: string,
        id?: string,
        status?: string,
    ): Promise<ProceduresListResponse> {
        var url: string = "";
        var setted = false;
        const query = new URLSearchParams();
        //this.baseURL + PREFIX_EU +
        url = "select ?id_str ?title_str ?status_str ?type ?p where {?p rdf:type ?type; dc:identifier ?i; dc:title ?t; eu:status ?s. ?type rdfs:subClassOf ?x. ?x rdfs:subClassOf eu:Procedure. BIND (STR(?i) AS ?id_str). BIND (STR(?t) AS ?title_str). BIND (STR(?s) AS ?status_str). ";
        if (title != null && title != "" && title !== "") {
            url = url + ' contains(lcase(?t),"' + title + '")';
        }
        if (id != null && id != "" && id !== "") {
            url = url + ' FILTER regex(?i, "' + id + '")';
        }
        if (status != null && status != "" && status !== "") {
            url = url + ' FILTER regex(?s, "' + status + '")';
        }
        /*
        if (!setted) {
            // tutte le procedure
        } else {
            url = `${this.baseURL}/?${query.toString()}`;
        }*/
        url = url + '}';
        return await this.adapter.doRequest<ProceduresListResponse>(url, "GET");
    }

    public async getDetail(title: string): Promise<Document> {
        const url = `${this.baseURL}/?title=${title}`;
        return await this.adapter.doRequest<Document>(url, "GET");
    }
}

export type ProceduresListResponse = {
    "head": {
        "link": never[];
        "vars": string[];
    };
    "results": {
        "distinct": boolean;
        "ordered": boolean;
        "bindings": {
            "id_str": DataValue;
            "title_str": DataValue;
            "status_str": DataValue;
            "type": DataValue;
            "p": DataValue;
        }[];
    };
};