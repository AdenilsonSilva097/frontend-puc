import React, { useRef } from "react";
import { ReactSVG } from "react-svg";

import SearchIcon from "../../assets/searchIcon.svg";

import SelfCleaningInput from "../../atoms/SelfCleaningInput";

import { SearchInputContainer } from "./styles";

const SearchInput: React.FC = () => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <SearchInputContainer onClick={handleClick}>
      <ReactSVG src={SearchIcon} />
      <SelfCleaningInput inputRef={inputRef} />
    </SearchInputContainer>
  );
};

export default SearchInput;
