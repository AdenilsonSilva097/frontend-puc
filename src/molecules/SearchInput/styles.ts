import styled from "styled-components";

import { windowWidth } from "../../styles/global";

const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 450px;
  padding: 7px 20px;
  border: solid 1px ${(props) => props.theme.colors.label};
  border-radius: 50px;

  :hover, :focus-within {
    border-color: ${(props) => props.theme.colors.primary};
    width: 450px;
  }

  > :first-child {
    padding-right: 30px;
    width: 17px;
    height: 17px;
  }

  > :last-child {
    flex-grow: 1;
  }

  @media (max-width: ${windowWidth.tablet}) {
    width: 250px;
    }

`;

export { SearchInputContainer };
