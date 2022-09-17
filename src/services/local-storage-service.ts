
export const setLocalStorage = (key: string, value: object): void => {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.removeItem(key)
  }
}
export const getLocalStorage = (key: string): any => {
  return JSON.parse(localStorage.getItem(key))
}
