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