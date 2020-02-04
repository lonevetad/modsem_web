import ModSemAPI from "@/api";


export default class RootState {
    public API: ModSemAPI;

    constructor() {
        this.API = new ModSemAPI();
    }
}