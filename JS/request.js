const key = '4fb3598019c9f2b0dc36c6518e6ad958';

// const baseURL = 'http://api.lopenweathermap.org/data/2.5/weather?q=Lagos&appid=4fb3598019c9f2b0dc36c6518e6ad958';

// fetch(baseURL)
//     .then((data) => { console.log('response', data.json()) })
//     .catch((error) => {
//         console.log(error);
//     });


const requestCity = async (city) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${key}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);
    if (!response.ok) {
        throw Error(response.status);
    }

    //promise data
    const data = await response.json();
    // console.log(data);
    return data;
}
// requestCity('Delhi');

const requestCity1 = async (lat, lon) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?lat=${lat}&lon=${lon}&appid=${key}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);
    if (!response.ok) {
        throw Error(response.status);
    }

    //promise data
    const data1 = await response.json();
    // console.log(data1);
    return data1;
}