/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const APIUrl = "http://localhost:8080"; // TODO

// little utils

const checkResponseHoldsErrors = function (response) {
    return (response.hasOwnProperty("ErrorDetail") ||
        (response.hasOwnProperty('status') && response.hasOwnProperty('error') &&
            (response.status >= 300 || response.status < 200)) // not a "ok" response
    );
}



class ModSem {
    constructor(url = null) {
        if (url === null) {
            url = APIUrl;
        }
        this.isLoaded = false;
        this.baseURL = url;
        this.procedure = new ProcedureAPI(this.baseURL);
        //this.group = new GroupAPI(this.baseURL);
    }

    getProcedureEndpoint() {
        return this.procedure;
    }


    /**
     * Returns the status of the API.
     */
    status() {
        return new Promise((resolve, reject) => {
            fetch(this.baseURL + `/ping`) //fetch 'e una funzione delle Promise, che mi pare Vue renda disponibile se assente
                .then(response => response.json())
                .then(response => {
                    if (checkResponseHoldsErrors(response)) {
                        reject(response);
                    }
                    resolve(response);
                });
        });
    }

    ping() {
        return this.status();
    }
    /*
        restHome() {
            return new Promise((resolve, reject) => {
                fetch(this.baseURL + `/resthome`, {
                        method: "GET"
                    })
                    .then(response => response.json())
                    .then(response => {
                        if (checkResponseHoldsErrors(response)) {
                            reject(response);
                        }
                        resolve(response);
                    });
            });
        }*/
}



/**
 * Represents the Procedure API methods.
 */
class ProcedureAPI {
    /**
     * Creates a new User API instance, connected to the specified base URL.
     * @param {String|null} url [Optional] The Base URL of the API.
     */
    constructor(url = null) {
        if (url === null)
            throw new Error("Cannot get base URL of User API");
        this.baseURL = url + `/User`;
        //this.alternativeURL = `https://blabla qualcos'altro.com`;
    }

    getProcedures() {
        /*
        return new Promise((resolve, reject) => {
            fetch(this.baseURL + `/facebookUser/`, {
                    method: "GET"
                })
                .then(response => response.json())
                .then(response => {
                    if (checkResponseHoldsErrors(response)) {
                        reject(response);
                    }
                    resolve(response);
                }).catch(reject);

        });
        */
        return {
            "head": {
                "link": [],
                "vars": [
                    "id_str",
                    "title_str",
                    "status_str",
                    "type",
                    "p"
                ]
            },
            "results": {
                "distinct": false,
                "ordered": true,
                "bindings": [{
                        "id_str": {
                            "type": "literal",
                            "value": "BUD2019/2213"
                        },
                        "title_str": {
                            "type": "literal",
                            "value": "Guidelines for the 2021 budget - Section III"
                        },
                        "status_str": {
                            "type": "literal",
                            "value": "Proposal"
                        },
                        "type": {
                            "type": "uri",
                            "value": "http://www.semanticweb.org/european_union#BudgetaryProcedure"
                        },
                        "p": {
                            "type": "uri",
                            "value": "http://www.semanticweb.org/european_union#PROC_BUD2019%2F2213"
                        }
                    },
                    {
                        "id_str": {
                            "type": "literal",
                            "value": "CNS2019/0807"
                        },
                        "title_str": {
                            "type": "literal",
                            "value": "Agreement on cooperation between Eurojust and Serbia"
                        },
                        "status_str": {
                            "type": "literal",
                            "value": "FirstLecture"
                        },
                        "type": {
                            "type": "uri",
                            "value": "http://www.semanticweb.org/european_union#SpecialProcedure"
                        },
                        "p": {
                            "type": "uri",
                            "value": "http://www.semanticweb.org/european_union#PROC_CNS2019%2F0807"
                        }
                    },
                    {
                        "id_str": {
                            "type": "literal",
                            "value": "COD2019/0179"
                        },
                        "title_str": {
                            "type": "literal",
                            "value": "Ensuring basic road freight and air connectivity: periods of application"
                        },
                        "status_str": {
                            "type": "literal",
                            "value": "Adopted"
                        },
                        "type": {
                            "type": "uri",
                            "value": "http://www.semanticweb.org/european_union#OrdinaryProcedure"
                        },
                        "p": {
                            "type": "uri",
                            "value": "http://www.semanticweb.org/european_union#PROC_COD2019%2F0179"
                        }
                    },
                    {
                        "id_str": {
                            "type": "literal",
                            "value": "COD2020/0006"
                        },
                        "title_str": {
                            "type": "literal",
                            "value": "Just Transition Fund"
                        },
                        "status_str": {
                            "type": "literal",
                            "value": "Proposal"
                        },
                        "type": {
                            "type": "uri",
                            "value": "http://www.semanticweb.org/european_union#OrdinaryProcedure"
                        },
                        "p": {
                            "type": "uri",
                            "value": "http://www.semanticweb.org/european_union#PROC_COD2020%2F0006"
                        }
                    }
                ]
            }
        }
    }
}