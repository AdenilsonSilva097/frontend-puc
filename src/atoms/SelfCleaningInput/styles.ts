import styled from "styled-components";

interface SelfCleaningInputContainerStyles {
  sizeInput: "small" | "large";
}

const SelfCleaningInputContainer = styled.div<SelfCleaningInputContainerStyles>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  > input {
    font-size: ${(props) => (props.sizeInput === "small" ? "14px" : "16px")};
    border: none;
    outline: none;
    background-color: inherit;
    padding-right: 10px;
    width: 100%;
    
    ::placeholder {
      color: ${(props) => props.theme.colors.placeholder};
    }
  }
`;

const CloseButton = styled.div<SelfCleaningInputContainerStyles>`
  background-color: gray;
  color: white;
  min-height: ${(props) => (props.sizeInput === "small" ? "20px" : "22px")};
  min-width: ${(props) => (props.sizeInput === "small" ? "20px" : "22px")};
  border-radius: 50%;
  text-align: center;
  font-size: 19px;
  font-weight: bold;
  line-height: 19.5px;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  transition: all 0.2s ease-in-out;

  :hover {
    transform: scale(1.2);
  }
`;

export { SelfCleaningInputContainer, CloseButton };
