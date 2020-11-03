import { error } from "@pnotify/core";

const BASE_URL = 'https://restcountries.eu/rest/v2/name/';
export default class CountryService{
    constructor () {
        this.searchQuery = '';
    }

    fetchCountry() {
        return fetch(`${BASE_URL}${this.searchQuery}`)
        .then(responce =>{
            if (responce.ok) {
                return responce.json()
            }
            throw new Error (responce.statusText);
        })
        .then(data=>{
            return data
        })
       
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