const getArgs = (args) => { // считываем аргументы из комадны
    const res = {}
    const [executer, file, ...rest] = args
    // мы берем из args первые 2, это executer и file, все остальное кладем в массив rest
    rest.forEach((value, index, array) => {
        if (value.charAt(0) == '-') {
            if (index == array.length - 1) {
                res[value.substring(1)] = true; // если аргумент последний ставим ему true
            } else if (array[index + 1].charAt(0) != '-') {
                res[value.substring(1)] = array[index + 1]; // если за ним параметр сохраняем его
            } else {
                res[value.substring(1)] = true; // если за ним параметр с дефисом тоже присвоим true
            }
        }
    })
    return res;
}

export { getArgs }