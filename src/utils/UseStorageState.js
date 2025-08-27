import { useEffect, useState } from "react";

function useStorageState(key, initialState) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);

    try {
      return stored ? JSON.parse(stored) : initialState;
    } catch (err) {
      console.warn("Erro ao parsear localStorage:", err);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn("Erro ao salvar no localStorage:", err);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useStorageState;
