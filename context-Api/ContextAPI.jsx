import { createContext, useState } from "react";

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [closeAnimation, setCloseAnimation] = useState(false);

  return (
    <MyContext.Provider value={{ closeAnimation, setCloseAnimation }}>
      {children}
    </MyContext.Provider>
  );
};
