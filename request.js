// Unique key is setup here
const key = '4fb3598019c9f2b0dc36c6518e6ad958';

const requestCity = async (city) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${key}`;

    const baseURL_second = 'https://api.openweathermap.org/data/2.5/forecast'
    const query_second = `?q=${city}&appid=${key}`;


    //make fetch call (promise call)
    const response_first = await fetch(baseURL + query);
    if (!response_first.ok) {
        throw Error(response_first.status);
    }

    const response_second = await fetch(baseURL_second + query_second);
    if (!response_second.ok) {
        throw Error(response_second.status);
    }

    //promise data
    const first_data = await response_first.json();
    const second_data = await response_second.json();
    const data = [first_data, second_data];
    return data;
}

const requestCity_current = async (lat, lon) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?lat=${lat}&lon=${lon}&appid=${key}`;

    const baseURL_second = 'https://api.openweathermap.org/data/2.5/forecast'
    const query_second = `?lat=${lat}&lon=${lon}&appid=${key}&cnt=7`;

    //make fetch call (promise call)
    const response_first = await fetch(baseURL + query);
    if (!response_first.ok) {
        throw Error(response_first.status);
    }

    const response_second = await fetch(baseURL_second + query_second);
    if (!response_second.ok) {
        throw Error(response_second.status);
    }

    //promise data
    const first_data = await response_first.json();
    const second_data = await response_second.json();
    const data = [first_data, second_data];
    return data;
}