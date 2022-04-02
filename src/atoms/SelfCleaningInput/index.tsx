import React, { useState } from "react";

import { SelfCleaningInputContainer, CloseButton } from "./styles";

interface SelfCleaningInputProps {
  inputRef: React.RefObject<HTMLInputElement>
}

const SelfCleaningInput: React.FC<SelfCleaningInputProps> = ({ inputRef }) => {

  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setInputValue(value);
  };

  const handleCloseButtonClick = () => {
    setInputValue("");
    inputRef.current?.focus();
  };

  return (
    <SelfCleaningInputContainer>
      <input
        type="InputValue"
        name="searchInput"
        id="search_input"
        placeholder="Procurar"
        value={inputValue}
        onChange={handleInputValue}
        ref={inputRef}
      />
      {inputValue !== "" ? <CloseButton onClick={handleCloseButtonClick}>x</CloseButton> : null}
    </SelfCleaningInputContainer>
  );
};

export default SelfCleaningInput;
