import styled from "styled-components";

interface EmpatieseLogotipoProps {
  color: "primary" | "secondary"
}

export const EmpatieseLogotipoContainer = styled.div<EmpatieseLogotipoProps>`
  > :first-child {
    height: 49px;
    svg {
      width: 100%;
      height: 100%;
      >:first-child {
        fill: ${(props) => (props.color === "primary" ? props.theme.colors.primary : "white")}
      }
    }
  }
`;
