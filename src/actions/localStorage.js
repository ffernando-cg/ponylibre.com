export const setLocalStorage = (obj, name) => {
  localStorage.setItem(name, JSON.stringify(obj));
}

export const getLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name));
}

export const deleteLocalStorage = (name) => {
  localStorage.removeItem(name);
}