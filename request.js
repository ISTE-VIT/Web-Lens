// Unique key is setup here
const key = '4fb3598019c9f2b0dc36c6518e6ad958';

const requestCity = async (city) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${key}`;

    const baseURL2 = 'https://api.openweathermap.org/data/2.5/forecast'
    const query2 = `?q=${city}&appid=${key}`;


    //make fetch call (promise call)
    const response1 = await fetch(baseURL + query);
    if (!response1.ok) {
        throw Error(response1.status);
    }

    const response2 = await fetch(baseURL2 + query2);
    if (!response2.ok) {
        throw Error(response2.status);
    }

    //promise data
    const data1 = await response1.json();
    const data2 = await response2.json();
    const data = [data1, data2];
    return data;
}

const requestCity1 = async (lat, lon) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?lat=${lat}&lon=${lon}&appid=${key}`;

    const baseURL2 = 'https://api.openweathermap.org/data/2.5/forecast'
    const query2 = `?lat=${lat}&lon=${lon}&appid=${key}&cnt=7`;

    //make fetch call (promise call)
    const response1 = await fetch(baseURL + query);
    if (!response1.ok) {
        throw Error(response1.status);
    }

    const response2 = await fetch(baseURL2 + query2);
    if (!response2.ok) {
        throw Error(response2.status);
    }

    //promise data
    const data1 = await response1.json();
    const data2 = await response2.json();
    const data = [data1, data2];
    return data;
}