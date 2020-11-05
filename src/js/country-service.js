const BASE_URL = 'https://restcountries.eu/rest/v2/name/';
export default class CountryService{
    constructor () {
        this.searchQuery = '';
    }

    async fetchCountry() {
        const responce = await fetch(`${BASE_URL}${this.searchQuery}`)
                if (responce.ok) {
                return responce.json()
            }
            throw new Error (responce.statusText);
    }
    get query () {
        return this.searchQuery;
    }
    set query (newQuery) {
        this.searchQuery = newQuery;
    }
    resetQuery(){
        this.searchQuery = ''
    }
}