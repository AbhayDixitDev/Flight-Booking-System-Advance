// src/hooks/useLocalStorage.js
import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  // Get from local storage then parse stored json or return initialValue if none
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key “' + key + '”: ', error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to local storage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage key “' + key + '”: ', error);
    }
  };

  return [storedValue, setValue];
}
