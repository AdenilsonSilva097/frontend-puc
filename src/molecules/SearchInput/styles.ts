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
  padding: ${(props) => (!props.open ? "7px 13px" : "7px 20px")};
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
    align-self: center;
    background-color: white;
    min-width: 95%;
    max-width: 95%;
  }

`;

export { SearchInputContainer };
