import axios, { AxiosRequestConfig } from "axios";
import { ProcedureAPI } from "./procedure";
import { Dictionary } from 'vue-router/types/router';
import { Client } from 'virtuoso-sparql-client';

export interface APIStatus {
    Status: string;
}

/**
 * Represents the development api endpoint's URL.
 */
//const apiURL: string = process.env.VUE_APP_API_URL;
//const baseAPIURL: string = 'http://localhost:8890/sparql';
const apiURL: string = 'http://localhost:8890/'; // baseAPIURL + "sparql/?default-graph-uri=&query=";
// "for production http://demo.openlinksw.com/sparql/";



/**
 * Represents an sdk to connect to Tryvium API.
 */
class ModSemAPI {

    /**
     * Represents the base URL of the api.
     */
    private baseURL: string;

    /**
     * Represents an adapter to the network layer.
     */
    private adapter: APIAdapter;


    //al api endpoints

    private procedure: ProcedureAPI;

    /**
     * Creates a new instance of the TryviumAPI class,
     * bound to the specified endpoint.
     * @param URL The URL of the API endpoint.
     */
    constructor(URL?: string) {
        this.baseURL = URL || apiURL;
        this.adapter = new VirtuosoAPIAdapter(this.baseURL);
        this.procedure = new ProcedureAPI(this.baseURL, this.adapter); // TODO fare quelle del MEP
    }

    public getAPIAdapter(): APIAdapter {
        return this.adapter;
    }

    public getProcedureEndpoint(): ProcedureAPI {
        return this.procedure;
    }

    public allIndividualsInOntology(): Promise<any> {
        const query = "select ?p where {?p rdf:type owl:NamedIndividual}";
        return this.adapter.callAPI(query);
    }

    //KEPT FOR HISTORY

    /**
     * Gets the API status.
     * @returns The status of the API Promise.
     */
    public async status(): Promise<APIStatus> {
        const url = `${this.baseURL}/`;
        return await this.adapter.doRequest<APIStatus>(url, "GET", null);
    }

    /**
     * Alias of status(), used to ping the server.
     * @see {@link status}
     * @returns The status of the API Promise.
     */
    public async ping(): Promise<APIStatus> {
        return await this.status();
    }
}

export abstract class APIAdapter {
    /**
     * Helper to perform authorized network requests from URL, payload and token.
     * It is used by other net related functions. Adds automatically.
     * @param url The URL to call for the desired request.
     * @param method The method of the network request.
     * @param accessToken The authorization token to put in Authorization header.
     * @param payload The optional payload of the request.
     * @param contentType The content type of the request, default 'application/json'.
     * @param customHeaders Optional headers to add to existing ones.
     * @param axiosCustomConfig Optional custom axios configuration.
     * @throws If the web request does not return 200 status. Actually throws always in this abstract class.
     */
    doAuthRequest<T>(
        url: string,
        method: string,
        payload: any | null = null,
        accessToken: string,
        customHeaders: Headers | null = null,
        axiosCustomConfig: AxiosRequestConfig | null = null
    ): Promise<T> {
        throw new Error("not implemented");
    }

    /**
     * Helper to perform network requests from URL and payload.
     * It is used by other net related functions. Adds automatically.
     * @param url The URL to call for the desired request.
     * @param method The method of the network request.
     * @param payload The optional payload of the request.
     * @param contentType The content type of the request, default 'application/json'.
     * @param customHeaders Optional headers to add to existing ones.
     * @param axiosCustomConfig Optional custom axios configuration.
     * @throws If the web request does not return 200 status. Actually throws always in this abstract class.
     */
    doRequest<T>(
        url: string,
        method: string,
        payload: any | null = null,
        customHeaders: Headers | null = null,
        axiosCustomConfig: AxiosRequestConfig | null = null
    ): Promise<T> {
        throw new Error("not implemented");
    }

    /**
     * Returns the manipulated result of a fetch request for a meaningful value.
     * This is particularly useful in fetch error handling.
     * @param result The result to manipulate.
     * @throws if the request has an error. In this case throws the manipulated error message. 
     *         Actually throws always in this abstract class.
     * @returns The result of the manipulation.
     */
    callAPI<T>(request: any): Promise<T> {
        throw new Error("not implemented");
    }
}


export class AxiosAPIAdapter extends APIAdapter {
    /**
     * Helper to perform authorized network requests from URL, payload and token.
     * It is used by other net related functions. Adds automatically.
     * @param url The URL to call for the desired request.
     * @param method The method of the network request.
     * @param accessToken The authorization token to put in Authorization header.
     * @param payload The optional payload of the request.
     * @param contentType The content type of the request, default 'application/json'.
     * @param customHeaders Optional headers to add to existing ones.
     * @param axiosCustomConfig Optional custom axios configuration.
     * @throws If the web request does not return 200 status. Actually throws always in this abstract class.
     */
    doAuthRequest<T>(
        url: string,
        method: string,
        payload: any | null = null,
        accessToken: string,
        customHeaders: HeadersInit | null = null,
        axiosCustomConfig: AxiosRequestConfig | null = null
    ): Promise<T> {
        const newHeaders = {
            "Authorization": `Bearer ${accessToken}`,
            "Access-Control-Allow-Origin": "*",
            ...customHeaders
        } as HeadersInit;
        return this.doRequest(url, method, payload, newHeaders, axiosCustomConfig);
    }

    /**
     * Helper to perform network requests from URL and payload.
     * It is used by other net related functions. Adds automatically.
     * @param url The URL to call for the desired request.
     * @param method The method of the network request.
     * @param payload The optional payload of the request.
     * @param customHeaders Optional headers to add to existing ones.
     * @param axiosCustomConfig Optional custom axios configuration.
     * @throws If the web request does not return 200 status.
     */
    public async doRequest<T>(
        url: string,
        method: string,
        payload: any | null = null,
        customHeaders: HeadersInit | null = null,
        axiosCustomConfig: AxiosRequestConfig | null = null
    ): Promise<T> {
        let headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "crossdomain": true,
            ...customHeaders
        } as HeadersInit;

        if ((headers as Record<string, string>).type) {
            (headers as Record<string, string>)["Access-Control-Allow-Origin"] = "*";
        }

        console.log("type of headers: " + (typeof headers) + ", or : " + headers.constructor.name);
        console.log(headers);
        let data = null;
        if (payload) {
            data = payload;
        }

        const request = {
            url,
            method,
            headers,
            data
        } as AxiosRequestConfig;

        if (axiosCustomConfig) {
            Object.assign(request, axiosCustomConfig);
        }

        return await this.callAPI<T>(request);
    }

    /**
     * Returns the manipulated result of a fetch request for a meaningful value.
     * This is particularly useful in fetch error handling.
     * @param result The result to manipulate.
     * @throws if the request has an error. In this case throws the manipulated error message.
     * @returns The result of the manipulation.
     */
    public async callAPI<T>(request: any): Promise<T> {
        try {
            const result = await axios.request<T>(request);
            return result.data;
        } catch (error) {
            const { response } = error;
            if (response) {
                const { data } = response;
                const { ErrorDetail } = data;
                if (ErrorDetail) {
                    throw new Error(ErrorDetail);
                }
                throw new Error(JSON.stringify(data));
            }
            throw new Error("callAPI error");
        }
    }
}

//

//

/**
 * Represents a set of options used
 */
export class VirtuosoQueryConnectionOptions {
    private format: string;
    private graph: string;
    private prefixes: Dictionary<string>;
    constructor() {
        this.format = "application/json";
        this.graph = "http://www.semanticweb.org/DAV/european_union";
        this.prefixes = { "eu": "http://www.semanticweb.org/european_union#" };
    }
    public getFormat(): string {
        return this.format;
    }
    public getGraph(): string {
        return this.graph;
    }
    public getPrefix(): object {
        return { // do not mutate original object
            "eu": this.prefixes["eu"]
        };
    }
}
export class VirtuosoAPIAdapter extends APIAdapter {

    private baseAPIURL: string;
    private optionsVirtuoso: VirtuosoQueryConnectionOptions;

    constructor(urlBase: string) {
        super();
        this.baseAPIURL = urlBase + "sparql"
        this.optionsVirtuoso = new VirtuosoQueryConnectionOptions();
    }

    public getOptionsVirtuoso(): VirtuosoQueryConnectionOptions {
        return this.optionsVirtuoso;
    }

    public async doRequest<T>(query: string): Promise<T> {
        // delega, dato che non abbiamo nulla di astruso
        return await this.callAPI<T>(query);
    }

    public async callAPI<T>(query: string): Promise<T> {
        const client = new Client(this.baseAPIURL);
        client.setOptions(
            this.optionsVirtuoso.getFormat(),
            this.optionsVirtuoso.getPrefix(),
            this.optionsVirtuoso.getGraph(),
        );
        console.log("\n\n on API.TS, query is:");
        console.log(query);
        return client.query(query);
    }
}

export default ModSemAPI;
