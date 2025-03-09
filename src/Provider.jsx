import { useState } from "react";
import { IngredientesContext } from "./Context";

export const IngredientesProvider = ({ children }) => {
  const [ingredientes, setIngredientes] = useState([]);

  return (
    <IngredientesContext.Provider value={{ ingredientes, setIngredientes }}>
      {children}
    </IngredientesContext.Provider>
  );
};