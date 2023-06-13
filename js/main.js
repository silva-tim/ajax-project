let countries = null;
const $countryDeck = document.querySelector('#country-deck');
const $search = document.querySelector('#search');

function getAllCountries() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://restcountries.com/v3.1/independent?status=true');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    countries = xhr.response;
    sortAlphabetical(countries);
    renderAll(countries);
  });
  xhr.send();
}

function renderCountry(country) {
  const $wrapper = document.createElement('div');
  $wrapper.classList.add('country-wrapper');

  const $country = document.createElement('div');
  $country.classList.add('country');

  const $flag = document.createElement('div');
  $flag.classList.add('flag');
  $country.append($flag);

  const $flagImg = document.createElement('img');
  $flagImg.src = country.flags.png;
  $flagImg.alt = country.flags.alt;

  const $name = document.createElement('h2');
  $name.textContent = country.name.common;

  const $line = document.createElement('hr');

  const $capital = document.createElement('h3');
  $capital.textContent = country.capital;

  const $region = document.createElement('h3');
  $region.textContent = country.region;

  const $population = document.createElement('h3');
  $population.textContent = formatPopulation(country.population);

  $flag.append($flagImg);
  $country.append($name);
  $country.append($line);
  $country.append($capital);
  $country.append($region);
  $country.append($population);
  $wrapper.append($country);

  const $countryBack = document.createElement('div');
  $countryBack.classList.add('country');

  const $nameB = document.createElement('h2');
  $nameB.textContent = country.name.common;

  const $lineB = document.createElement('hr');

  const $capitalB = document.createElement('h3');
  $capitalB.innerHTML = '<span>Capitol: </span>' + country.capital[0];

  const $regionB = document.createElement('h3');
  $regionB.innerHTML = '<span>Region: </span>' + country.region;

  const $populationB = document.createElement('h3');
  $populationB.innerHTML = '<span>Population: </span>' + country.population.toLocaleString();

  const $pinIcon = document.createElement('i');
  $pinIcon.classList.add('fa-solid', 'fa-ma-pin');

  const $subRegion = document.createElement('h3');
  $subRegion.innerHTML = '<i class="fa-solid fa-map-pin"></i> ' + country.subregion;

  const $money = document.createElement('h3');
  $money.innerHTML = '<i class="fa-solid fa-money-bill"></i> ' + Object.keys(country.currencies);

  const arrayLanguage = Object.values(country.languages);
  const $language = document.createElement('h3');
  $language.innerHTML = '<i class="fa-solid fa-language"></i> ';
  for (let i = 0; i < arrayLanguage.length && i < 4; i++) {
    $language.innerHTML += Object.values(arrayLanguage)[i];
    if (i !== 3 && i !== arrayLanguage.length - 1) {
      $language.innerHTML += ', ';
    }
  }
  if (arrayLanguage.length > 4) {
    $language.innerHTML += ' + more';
  }

  $countryBack.append($nameB);
  $countryBack.append($lineB);
  $countryBack.append($capitalB);
  $countryBack.append($regionB);
  $countryBack.append($populationB);
  $countryBack.append($subRegion);
  $countryBack.append($money);
  $countryBack.append($language);
  // $wrapper.append($countryBack);
  return $wrapper;
}

function formatPopulation(number) {
  if (number > 1000000000) {
    return (Math.round(number / 100000000) / 10) + ' Billion People';
  } else if (number > 100000000) {
    return (Math.round(number / 1000000)) + ' Million People';
  } else if (number > 1000000) {
    return (Math.round(number / 100000) / 10) + ' Million People';
  } else {
    return '< 1 Million People';
  }
}

function renderAll(countryArray) {
  for (let i = 0; i < countryArray.length; i++) {
    $countryDeck.append(renderCountry(countryArray[i]));
  }
}

function sortAlphabetical(countryArray) {
  countryArray.sort(function (a, b) {
    if (a.name.common > b.name.common) {
      return 1;
    } else if (a.name.common < b.name.common) {
      return -1;
    }
    return 0;
  });
}

function handleSearch(event) {
  unrenderAll();

  for (let i = 0; i < countries.length; i++) {
    if (countries[i].name.common.toLowerCase().includes(event.target.value.toLowerCase())) {
      $countryDeck.append(renderCountry(countries[i]));
    }
  }
}

function unrenderAll() {
  const $countryWrappers = document.querySelectorAll('div.country-wrapper');

  $countryWrappers.forEach(function (element) {
    element.remove();
  });
}

$search.addEventListener('input', handleSearch);

getAllCountries();

// test

const $card = document.querySelector('.country-wrapper');

$card.addEventListener('click', function () {
  $card.classList.toggle('is-flipped');
});
