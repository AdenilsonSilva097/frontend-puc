import styled from "styled-components";

interface propsTeste {
  color?: "primary" | "secondary";
}

export const ButtonField = styled.button<propsTeste>`
  padding: 5px 0px 5px 0px;
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => props.theme.colors.background};
  border: none;
  border-radius: 20px;
  background-color: ${(props) => (props.color === "primary"
    ? props.theme.colors.primary
    : props.theme.colors.secondary)};
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    cursor: pointer;
    border: none;
    box-shadow: 2px 2px 5px 1px lightgray;
    outline: none;
    transform: scale(1.1);
  }
`;
