import { useEffect, useState } from "react";

function UseStorageState(key, initialState) {
  const isArray = Array.isArray(initialState);

  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);

    if (stored) {
      try {
        return isArray ? JSON.parse(stored) : stored;
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, isArray ? JSON.stringify(value) : value);
  }, [key, value, isArray]);

  return [value, setValue];
}

export default UseStorageState;
