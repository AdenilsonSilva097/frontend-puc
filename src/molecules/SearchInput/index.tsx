import React, { useRef } from "react";
import { ReactSVG } from "react-svg";

import SearchIcon from "../../assets/searchIcon.svg";

import SelfCleaningInput from "../../atoms/SelfCleaningInput";

import { SearchInputContainer } from "./styles";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  sizeInput: "small" | "large";
  clearInputValue: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ sizeInput, clearInputValue, ...rest }) => {

  const [open, setOpen] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setOpen(true);
    inputRef.current?.focus();
  };

  return (
    <SearchInputContainer open={open} onClick={handleClick} sizeInput={sizeInput}>
      <ReactSVG src={SearchIcon} />
      <SelfCleaningInput
        inputRef={inputRef}
        sizeInput={sizeInput}
        clearInputValue={clearInputValue}
        {...rest}
      />
    </SearchInputContainer>
  );
};

export default SearchInput;
