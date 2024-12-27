export const getLocalStorageStatus = () => {
  return localStorage.length > 0;
};
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};
export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
