import './styles.css';
const debounce = require('lodash.debounce');
import countryListTemplate from './handlebars/country-list.hbs';
import error from './js/pnotyfy/pnotyfy.js'
import personalCountryTemplate from './handlebars/personal-country-marckup.hbs'
import CountryService from './js/country-service'

const countryApiServices = new CountryService();

const refs = {
    searchForm: document.querySelector('.js-searh-form'),
    counrtySection: document.querySelector('.country-wrapper'),
    input: document.querySelector('.input-js')
};

refs.searchForm.addEventListener('input',debounce(onSearch,1000));



async function onSearch(e) {
    e.preventDefault();
    countryApiServices.searchQuery = e.target.value;
    if (countryApiServices.searchQuery==='') {
        renderMarkupEmptyList()
        return
    }

    try {
        const country =await countryApiServices.fetchCountry()
    
        if (country.length === 1) {
           renderMarkupCountryItem(country);
       } else if (country.length > 1 && country.length<=10 ) {
           renderMarkupCountryList(country);
       } else if (country.length > 10) {
           errorQuantytyErrorHandler() ;
       }} catch {errorInputHandler()}
};

function errorInputHandler() {
    renderMarkupEmptyList();
    const incorrectError =  error({
        text: "Incorrect request please send the request with correct format",
        sticker: false,
        delay: 2000,
      })
      return incorrectError;
}


function renderMarkupCountryList (country) {
    const marckup = countryListTemplate(country);
    refs.counrtySection.innerHTML = marckup;
}  

function renderMarkupEmptyList () {
    refs.counrtySection.innerHTML = '';
}

function renderMarkupCountryItem(country) {
    const marckup = personalCountryTemplate({ country });
    refs.counrtySection.innerHTML = marckup;
}



function errorQuantytyErrorHandler () {
    return error({
        text: "To many mathes found. Please enter a more specific query!",
        sticker: false,
        delay: 2000,
      });
}