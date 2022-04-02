import styled from "styled-components";

interface ModalContainerProps {
  overlay: boolean
}

export const ModalContainer = styled.div<ModalContainerProps>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
  z-index: 500;
  background-color: ${(props) => (props.overlay ? "rgb(0, 0, 0, 0.65)" : "inherit")};
`;
