export const getFormatedDate = timestamp => {
    const date = new Date(timestamp)
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
}

export const getFormatedTime = timestamp => {
    const date = new Date(timestamp)
    const hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    return `${hours}:${minutes}`
}

export const formatDate = date => {
    const arr = [clearNumbers(date).slice(0, 8), clearNumbers(date).slice(8, 16)]
    const start = checkDate(arr[0])
    const end = checkDate(arr[1])

    const newDate = start + end

    let final = [...newDate].map((c, index) => {
        if (index == 4 || index == 6 || index == 12 || index == 14) {
            return '.' + c
        }
        if (index == 8) {
            return ' - ' + c
        }
        return c
    }).join('')
    return final
}

export const clearNumbers = string => {
    return [...string].filter(char => !!char.match(/[0-9]/)).join('')
}

export const stringToTimestamp = string => {
    let clearedStrings = string.replace('.', '/').replace(' ', '').split('-')
    let start = new Date(clearedStrings[0])
    let end = new Date(clearedStrings[1])

    return {
        start_time: start.getTime() / 1000,
        end_time: end.getTime() / 1000
    }
}

export const timestampToString = (start, end) => {
    const formatedDate = formatDate(generate(start) + generate(end))
    return formatedDate

    function generate(timestamp) {
        const date = new Date(timestamp)
        const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
        const year = date.getFullYear()
        return `${year}.${month}.${day}`
    }
}

const checkDate = date => {
    if (date[0] != 2) {
        return '';
    }

    if (date[4] > 1) {
        return date.slice(0, date.length - 1) + '0' + date[date.length - 1]
    } else if (date[4] == 1) {
        if (date[5] > 2) {
            return date.slice(0, date.length - 1)
        }
    } else {
        if (date[5] == 0) {
            return date.slice(0, date.length - 1)

        }
    }

    if (date[6] > 3) {
        return date.slice(0, date.length - 1)
    } else if (date[6] == 3) {
        if (date[7] > 1) {
            return date.slice(0, date.length - 1)

        }
    }

    if (date[6] == 0 && date[7] == 0) {
        return date.slice(0, date.length - 1)
    }

    return date
}

export function validURL(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(url);
}