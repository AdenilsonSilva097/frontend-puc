import styled from "styled-components";

import { windowWidth } from "../../styles/global";

interface SearchInputStyles {
  sizeInput: "small" | "large";
  open: boolean;
}

const SearchInputContainer = styled.div<SearchInputStyles>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 150px;
  padding: 7px 10px 7px 15px;
  border: solid 1px ${(props) => props.theme.colors.label};
  border-radius: 50px;
  transition: all 0.2s ease-in-out;

  :hover, :focus-within {
    border-color: ${(props) => props.theme.colors.primary};
    width: ${(props) => (props.sizeInput === "small" ? "300px" : "450px")};
  }

  > :first-child {
    padding-right: 30px;
    width: 17px;
    height: 17px;
  }

  > :last-child {
    flex-grow: 1;
  }

  @media (max-width: ${windowWidth.mobile.large}) {
    min-width: 100%;
    max-width: 100%;
  }

  @media print {
    display: none;
  }

`;

export { SearchInputContainer };
