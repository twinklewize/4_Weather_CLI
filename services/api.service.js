import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const getWeather = async (city) => {
	const token = await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
	}
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: 'ru',
			units: 'metric'
		}
	});
    // console.log(data)
	return data;
};

export { getWeather, getIcon };

    // https обычно не используется на практике
    // const url = new URL('https://api.openweathermap.org/data/2.5/weather')
    // url.searchParams.append('q', city);
    // url.searchParams.append('appid', token)
    // url.searchParams.append('lang', 'ru')
    // url.searchParams.append('units', 'metrics')

    // https.get(url, (response) => { // передаем url, получаем response
    //     let res = '' // нужно будет распарсить в json
    //     response.on('data', (chunk) => {
    //         res += chunk
    //     }) // кладем данные в response

    //     response.on('end', (chunk) => {
    //         console.log(res)
    //     }) // когда все получили выводим результат
    // })