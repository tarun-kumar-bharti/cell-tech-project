class StorageService {
  constructor() {}
 
  setItem(key, value) {
    const storageKey = key;
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(storageKey, stringValue);
  }

   
  getItem(key) {
    const storageKey = key;
    const item = localStorage.getItem(storageKey);
    try {
      return JSON.parse(item);
    } catch (e) {
      return item;  
    }
  }
 
  removeItem(key) {
    const storageKey = key;
    localStorage.removeItem(storageKey);
  } 
  
  clearAll() {
    localStorage.clear();
  }
}
