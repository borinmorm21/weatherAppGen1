const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=Battambang&days=3';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '39648335a2mshd9d86048c612e92p133a28jsn96aeebfdb9b9',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};

async function fetchWeather() {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const locationElement = document.getElementById('locaiton');
    locationElement.innerHTML = data.location.country + ", " + data.location.name;

    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';

    const result = data.forecast.forecastday;
    
    for(let i = 0; i < result.length; i++){
        cardContainer.innerHTML += `
        <div class="card">
          <div class="left">
            <p id="date">${data.forecast.forecastday[i].date}</p>
            <h3>${data.forecast.forecastday[i].day.daily_chance_of_rain} %</h3>
            <img src="${data.forecast.forecastday[i].day.condition.icon}" alt="icon">
          </div>
          
          <div class="right">
            <h3 id="temp">${data.forecast.forecastday[i].day.avgtemp_c}<sup>o</sup> / ${data.forecast.forecastday[i].day.avgtemp_f}<sup>F</sup></h3>
            <div class="content-text">
              <p>Wind: <strong>${data.forecast.forecastday[i].day.maxwind_kph}</strong> KMPH</p>
              <p>Humidity: <strong>${data.forecast.forecastday[i].day.avghumidity} %</strong></p>
            </div>
          </div>
        </div>`;
    }

    console.log(data);

  } catch (error) {
    console.error(error);
  }
}

fetchWeather();
