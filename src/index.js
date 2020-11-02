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
    input: document.querySelector('.input-js')
};

refs.searchForm.addEventListener('input',debounce(onSearch,1000));
    

function onSearch(e) {
    e.preventDefault();
    countryApiServices.searchQuery = e.target.value;
    if (countryApiServices.searchQuery==='') {
      countryEmptyListMarckup()
        return
    }
    countryApiServices.fetchCountry()
    .then(country=>{
         if (country.length === 1) {
            personalCountry(country)
        } else if (country.length > 1 && country.length<=10 ) {
            countryListMarckup(country)
        } else {a}
    })
    
    // .catch(errors=>console.log(error))
    };

function countryListMarckup(country) {
    const marckup = countryListTemplate(country);
    refs.counrtySection.innerHTML = marckup;
}  

function countryEmptyListMarckup () {
    refs.counrtySection.innerHTML = '';
}

function personalCountry(country) {
    const marckup = personalCountryTemplate({ country });
    refs.counrtySection.innerHTML = marckup;
}