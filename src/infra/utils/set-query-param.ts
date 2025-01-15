export const setQueryParam = (key: string, value: string) => {
    const url = new URL(window.location.origin);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url.toString());
    return url.toString();
}

export const getQueryParam = (value: string) => {
    const url = new URL(window.location.href);
    return url.searchParams.get(value);
}

export const removeQueryParam = (key: string) => {
    const url = new URL(window.location.origin);
    url.searchParams.delete(key);
    window.history.pushState({}, '', url.toString());
    return url.toString();
}