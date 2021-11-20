const searchForm = document.querySelector('.search-loaction');
const cityValue = document.querySelector('.search-loaction input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.left-card');
const highlights = document.querySelector('.highlights');
const week = document.querySelector('.weekly');

const spitOutCelcius = (kelvin) => {
  celcius = Math.round(kelvin - 273.15);
  return celcius;
}
const isDayTime = (icon) => {
  if (icon.includes('d')) { return true }
  else { return false }
}

updateWeatherApp = (data) => {
  const [daily, weekly] = data;
  console.log(daily);
  console.log(weekly);
  const imageName = daily.weather[0].icon;
  // const weekly_imageName = weekly.list[0].weather[0].icon;
  const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`
  // const weekly_iconSrc = `http://openweathermap.org/img/wn/${weekly_imageName}@2x.png`
  cityName.textContent = daily.name;
  cardBody.innerHTML = `
    <div class="card-body">
          <div class="card-mid d-flex">
            <div class="col-7 text-center temp">
              <span style="font-size: 3em; letter-spacing: -2px;">${spitOutCelcius(daily.main.temp)}&deg;C</span>
            </div>
            <div class="col-5 mt-3 condition-temp">
              <p class="condition" style="text-transform:capitalize;">${daily.weather[0].description}</p>
              <p class="high">${spitOutCelcius(daily.main.temp_max)}&deg;C</p>
              <p class="low">${spitOutCelcius(daily.main.temp_min)}&deg;C</p>
            </div>
          </div>
          <div class="icon-container card shadow mx-auto my-3">
            <img src="${iconSrc}" class="mx-auto my-auto" alt="" />
          </div>
          <div class="px-3 py-2 d-flex justify-content-center gap-2">
            <div class="text-center">
            <span>Feels Like</span>
              <span class="pr-2">${spitOutCelcius(daily.main.feels_like)}&deg;C</span>
            </div>
            <div class="text-center ml-4">
            <span>Humidity</span>
              <span>${daily.main.humidity}%</span>
            </div>
          </div>
        </div>
    `;

  highlights.innerHTML = `
    <div style="border-radius: 15%" class="
    d-flex
    col-12 col-md-4 col-xl-2 col-lg-3
    flex-column
    align-items-center
    bg-white
    p-3
    m-2
    font-weight-bold
  ">
<p class="py-2">Visibility</p>
<h2 class="py-2">${parseInt(daily.visibility) / 1000} km</h2>
<img src="./assets/binoculars.png" style="height: 120px;" alt="" srcset="" />
</div>
<div style="border-radius: 15%" class="
    d-flex
    col-12 col-md-4 col-xl-2 col-lg-3
    flex-column
    align-items-center
    bg-white
    p-3
    m-2
    font-weight-bold
  ">
<p class="py-2">Pressure</p>
<h2 class="py-2">${daily.main.pressure} hPa</h2>
<img src="./assets/pressure-gauge.png" style="height: 120px;" alt="" srcset="" />
</div>
<div style="border-radius: 15%" class="
    d-flex
    col-12 col-md-4 col-xl-2 col-lg-3
    flex-column
    align-items-center
    bg-white
    p-3
    m-2
    font-weight-bold
  ">
<p class="py-2">Wind Speed</p>
<h2 class="py-2">${daily.wind.speed} km/h</h2>
<img src="./assets/windock.png" style="height: 120px;" alt="" srcset="" />
</div>
    `;

  week.innerHTML = ``;

  for (i = 0; i < 7; i++) {
    const weekly_imageName = weekly.list[i].weather[0].icon;
    const weekly_iconSrc = `http://openweathermap.org/img/wn/${weekly_imageName}@2x.png`
    week.innerHTML += `
  <div style="border-radius: 15%" class="
  d-flex
  col-12 col-md-4 col-xl-2 col-lg-3
  flex-column
  align-items-center
  bg-white
  p-3
  m-2
  font-weight-bold
">
<p>${weekly.list[i].weather[0].main}</p>
<img src="${weekly_iconSrc}" class="py-4" alt="" style="max-width: 100px" />
<div class="d-flex flex-column align-items-center">
  <div class="p-2"><span>${spitOutCelcius(weekly.list[i].main.temp_max)}&deg;C</span></div>
  <div class="p-2"><span>${spitOutCelcius(weekly.list[i].main.temp_min)}&deg;C</span></div>
  <div class="p-2 ml-3"><span>${weekly.list[i].dt_txt}</span></div>
</div>
</div>
  `;
  }

  if (isDayTime(imageName)) {
    // console.log('day');
    timeImage.setAttribute('src', './assets/day_image.svg');
  } else {
    // console.log('night');
    timeImage.setAttribute('src', './assets/night_image.svg');
  }
}

function successCallback(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(lat, lon);
  requestCity_current(lat, lon)
    .then((first_data) => {
      updateWeatherApp(first_data);
    })
    .catch((error) => {
      // console.error(error);
    })
}

navigator.geolocation.getCurrentPosition(successCallback);

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const citySearched = cityValue.value.trim();
  // console.log(citySearched);
  searchForm.reset();

  requestCity(citySearched)
    .then((data) => {
      updateWeatherApp(data);
    })
    .catch((error) => {
      // console.error(error);
    })
})