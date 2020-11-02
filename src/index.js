import './styles.css';
const debounce = require('lodash.debounce');
import countryListTemplate from './handlebars/country-list.hbs';
import error from './js/pnotyfy/pnotyfy.js'
import personalCountryTemplate from './handlebars/personal-country-marckup.hbs'
import CountryService from './js/country-service'

const countryApiServices = new CountryService;


const refs = {
    searchForm: document.querySelector('.js-searh-form'),
    counrtySection: document.querySelector('.country-wrapper'),
    input: document.querySelector('.oop')
};



refs.searchForm.addEventListener('input',debounce(onSearch,1000));
    

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value;
    getCountryByName(searchQuery)
    .then(marckupVariablesHandler(searchQuery))
    // .catch(errors=>console.log(error))
    };

function marckupVariablesHandler(searchQuery) {
    if (searchQuery==='') {
        countryEmptyListMarckup();
    } else if (searchQuery.length === 1) {
        personalCountry()
    } else if (searchQuery.length > 1 && searchQuery.length <= 10) {
        countryListMarckup() 
    } else {error}
    
}


function countryListMarckup(country) {
    const marckup = countryListTemplate({ country });
    refs.counrtySection.innerHTML = marckup;
}  

function countryEmptyListMarckup () {
    refs.counrtySection.innerHTML = '';
}

function getCountryByName () {
    countryApiServices.fetchCountry()
}

function personalCountry(country) {
    const marckup = personalCountryTemplate({ country });
    refs.counrtySection.innerHTML = marckup;
}