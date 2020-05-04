export const parseQueryString = (params = {}, mark = true) => {
    return (mark ? '?' : '') + Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
}
