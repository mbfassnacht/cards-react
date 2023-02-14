import React from "react";
import { useAppContext } from "../context/AppContext";
import styled from "styled-components";

function Filter() {
  const { filter, setFilter } = useAppContext();

  function handleChange(filterTerm: string) {
    setFilter(filterTerm);
  }

  return (
    <div>
      <label htmlFor={"filter-input"}>Amount Filter</label>
      <StyledInput
        type="number"
        value={filter}
        onChange={(e) => handleChange(e.target.value)}
        id="filter-input"
        placeholder="Amount"
        data-testid="filter-input"
      ></StyledInput>
    </div>
  );
}

const StyledInput = styled.input`
  width: 100%;
  height: 20px;
`;

export default Filter;
