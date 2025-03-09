import React, { useContext, useState } from "react";
import Select from "react-select";
import { IngredientesContext } from "../Context";
import ingredientes from "../../ingredientes.json"

const SelectIngredientes = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const {setIngredientes} =  useContext(IngredientesContext)
  const handleChange = (selected) => {
    setSelectedOptions(selected);
    setIngredientes(selected.map((option) => option.value));
  };

  return (
    <Select
      options={ingredientes}
      isMulti
      placeholder="Selecciona ingredientes..."
      value={selectedOptions}
      onChange={handleChange}
      isSearchable
      className="w-9/12 mx-auto mt-6"
    />
  );
};

export default SelectIngredientes;
