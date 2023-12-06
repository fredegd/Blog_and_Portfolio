import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext();

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export default function DarkModeProvider({ children }) {
  console.log(localStorage.getItem("dk"));

  const [dk, setDk] = useState(
    localStorage.getItem("dk") ? JSON.parse(localStorage.getItem("dk")) : true
  );

  localStorage.setItem("dk", dk);

  const toggleDarkMode = () => {
    const newDk = !dk;
    localStorage.setItem("dk", newDk);
    setDk(newDk);
  };

  return (
    <DarkModeContext.Provider value={{ dk, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
