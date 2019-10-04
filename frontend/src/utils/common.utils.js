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
    const newDate = clearNumbers(date).slice(0, 16)
    let final = [...newDate].map((c, index) => {
        if (index == 4 || index == 6 || index == 12 || index == 14) {
            return '.' + c
        }
        if (index == 8) {
            return ' - ' + c
        }
        return c
    }).join('')
    stringToTimestamp(final)
    return final
}

export const clearNumbers = string => {
    return [...string].filter(char => !!char.match(/[0-9]/)).join('')
}

export const stringToTimestamp = string => {
    let clearedStrings = string.replace('.', '/').replace(' ', '').split('-')
    let start = new Date(clearedStrings[0])
    let end = new Date(clearedStrings[1])
    console.log(start + '- ' + end)
}