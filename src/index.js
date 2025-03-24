import './style.css';
import daySvg from '../images/day.svg';
import nightSvg from '../images/night.svg';
import cloudySvg from '../images/cloudy.svg';
import rainSvg from '../images/rain.svg';
import snowSvg from '../images/snow.svg';
import thunderSvg from '../images/thunder.svg';
import windSvg from '../images/wind.svg';
import searchIconSvg from '../images/search.svg';
import trashSvg from '../images/trash-solid.svg';


const body = document.querySelector('body');

const APIManager = (function(){
    var cityArr = [];

    const fetchAllCities = async () => {
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries');
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };
            const data = await response.json();
            cityArr = data.data.map(obj => {
                return {
                    cities: obj.cities,
                    country: obj.country
                }
            });
        } catch(err) {
            console.log('Error:', err.message);
            throw err;
        };
    }

    const onInputChanges = (input, parent, inputField) => {
        removeDropdown();
        if(input.toLowerCase() === '') return;
        const filteredArr = [];
        cityArr.forEach(object => {
            object.cities.forEach(city => {
                if(city.substr(0, input.length).toLowerCase() === input.toLowerCase()){
                    filteredArr.push({
                        cityName: city,
                        country: object.country
                    });
                };
            });
        });
        addDropdown(input, parent, filteredArr, inputField);
    }

    const removeDropdown = () => {
        const list = document.querySelector('#autocomplete-dropdown');
        if(list) list.remove();
    }

    const addDropdown = (input, parent, arr, inputField) => {
        const ul = document.createElement('ul');
        ul.setAttribute('id', 'autocomplete-dropdown');
        parent.appendChild(ul);

        arr.forEach(obj => {
            const li = document.createElement('li');
            ul.appendChild(li);

            const button = document.createElement('button');
            button.textContent = `${obj.cityName}, ${obj.country}`;
            li.appendChild(button);
            button.addEventListener('click', (e) => {
                selectCity(e, inputField);
            });
        });
    }

    const fetchWeatherData = (city) => {
        try {
            // const response = fetch()
        } catch(err) {
            console.log('Error: ', err.message);
            throw err;
        }
    }

    const selectCity = (e, inputField) => {
        e.preventDefault();
        inputField.value = e.target.textContent;
        fetchWeatherData(inputField.value);
        removeDropdown();
    }

    return {
        fetchAllCities,
        onInputChanges
    }

})();

const PageGUI = (function(){

    // const addCityCardDiv = (input) => {

    // }

    const createPage = () => {
        const pinkCircle = document.createElement('div');
        pinkCircle.classList.add('oval-top-left-shape');
        body.appendChild(pinkCircle);

        const purpleCircle = document.createElement('div');
        purpleCircle.classList.add('oval-bottom-right-shape');
        body.appendChild(purpleCircle);

        const parent = document.createElement('div');
        parent.classList.add('parent');
        body.appendChild(parent);

        const titleNInputDiv = document.createElement('div');
        titleNInputDiv.classList.add('title-and-input-div');
        parent.appendChild(titleNInputDiv);

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title-div');
        titleNInputDiv.appendChild(titleDiv);

        const section = document.createElement('section');
        titleDiv.appendChild(section);

        const h1PaintOrder = document.createElement('h1');
        h1PaintOrder.classList.add('paint-order');
        section.appendChild(h1PaintOrder);

        const span1 = document.createElement('span');
        span1.textContent = 'weather';
        h1PaintOrder.appendChild(span1);

        const span2 = document.createElement('span');
        span2.textContent = 'search';
        h1PaintOrder.appendChild(span2);

        const searchNSubmitBtnDiv = document.createElement('div');
        searchNSubmitBtnDiv.classList.add('search-and-submit-btn-div');
        titleNInputDiv.appendChild(searchNSubmitBtnDiv);

        const searchDivParent = document.createElement('div');
        searchDivParent.classList.add('search-div-parent');
        searchNSubmitBtnDiv.appendChild(searchDivParent);

        const searchDiv = document.createElement('div');
        searchDiv.classList.add('search-div');
        searchDivParent.appendChild(searchDiv);

        const searchSvgDiv = document.createElement('div');
        searchSvgDiv.classList.add('search-svg-div');
        searchDiv.appendChild(searchSvgDiv);

        const searchSvg = document.createElement('object');
        searchSvg.setAttribute('type', 'image/svg+xml');
        searchSvg.classList.add('search-svg');
        searchSvg.data = searchIconSvg;                         
        searchSvgDiv.appendChild(searchSvg);

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.autocomplete = 'off';
        searchInput.placeholder = 'Hong Kong';
        searchDiv.appendChild(searchInput);
        searchInput.addEventListener('input', (e) => {
            console.log(e.target.value);
            APIManager.onInputChanges(e.target.value, searchDivParent, searchInput);
        });

        const submitBtn = document.createElement('button');
        submitBtn.classList.add('submit-btn');
        submitBtn.textContent = 'Search';
        searchNSubmitBtnDiv.appendChild(submitBtn);
        submitBtn.addEventListener('click', () => {
            console.log('btn clicked');
        });
    }

    return { createPage }
})();

window.addEventListener('load', () => {
    PageGUI.createPage();
    APIManager.fetchAllCities();
});

