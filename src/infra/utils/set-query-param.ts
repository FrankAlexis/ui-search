export const setQueryParam = (query: string) => {
    const url = new URL(window.location.origin);
    url.searchParams.set('query', query);
    window.history.pushState({}, '', url.toString());
    return url.toString();
}

export const getQueryParam = (value: string) => {
    const url = new URL(window.location.href);
    return url.searchParams.get(value);
}