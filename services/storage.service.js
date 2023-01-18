import { homedir } from 'os'; // получить доступ к директории пользователя
import { join } from 'path'; // дать название файлу, норамальная работа с путями
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}

const saveKeyValue = async (key, value) => {
    let data = {};
    if (await isExist(filePath)) { // проверяем существует ли уже файл
        const file = await promises.readFile(filePath); // если существует читаем его
        data = JSON.parse(file); // превращаем прочитанное в объект
    }
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data)); // сохранить файл в filepath 
};

const getKeyValue = async (key) => {
    if (await isExist(filePath)) { // если файл существует читаем его
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);
        return data[key]; // возвращаем данные
    }
    return undefined;
};

const isExist = async (path) => {
    try {
        await promises.stat(path); //если файл существует ошибки не будет (возвращает статистику по файлу)
        return true;
    } catch (e) {
        return false;
    }
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };


    // console.log(basename(filePath)) // расположение файла
    // console.log(dirname(filePath)) // файл
    // console.log(extname(filePath)) // расширение файла
    // console.log(relative(filePath, dirname(filePath))) // какой путь нужен относительно одного файла к другому
    // console.log(isAbsolute(filePath)) // абсолютный путь или нет
    // console.log(resolve('..')) // что будет если от текущего пути сделаем шаги
    // console.log(sep) // сепаратор данной системы

