import { useState } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  const setValue = (value: string) => {
    setStoredValue(value);
    localStorage.setItem(key, value);
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
