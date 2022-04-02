import styled from "styled-components";

const SelfCleaningInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  > input {
    flex-grow: 1;
    font-size: 19px;
    border: none;
    outline: none;
    background-color: inherit;
    padding-right: 10px;
    
    ::placeholder {
      color: ${(props) => props.theme.colors.placeholder};
    }
  }
`;

const CloseButton = styled.div`
  background-color: gray;
  color: white;
  height: 22px;
  width: 22px;
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
