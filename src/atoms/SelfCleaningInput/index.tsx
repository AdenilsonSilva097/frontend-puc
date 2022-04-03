import React, { useState } from "react";

import { SelfCleaningInputContainer, CloseButton } from "./styles";

interface SelfCleaningInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef: React.RefObject<HTMLInputElement>
  sizeInput: "small" | "large";
  clearInputValue: () => void;
}

const SelfCleaningInput: React.FC<SelfCleaningInputProps> = ({
  inputRef, sizeInput, clearInputValue, ...rest
}) => (
  <SelfCleaningInputContainer sizeInput={sizeInput}>
    <input
      type="InputValue"
      name="searchInput"
      id="search_input"
      placeholder="Procurar"
      autoComplete="off"
      ref={inputRef}
      {...rest}
    />
    {rest.value !== "" ? <CloseButton onClick={clearInputValue} sizeInput={sizeInput}>x</CloseButton> : null}
  </SelfCleaningInputContainer>
);

export default SelfCleaningInput;
