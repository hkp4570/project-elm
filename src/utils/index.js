
export const getStore = name => {
    if(!name) return;
    return window.localStorage.getItem(name);
}