import styled from "styled-components";

import { windowWidth } from "../../styles/global";

interface InputFieldProps {
  invalid?: boolean;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  height: 100px;
  width: 100%;
  min-width: 50px;

  > label {
    color: ${(props) => props.theme.colors.label};

    @media (max-width: ${windowWidth.mobile.large}) {
      font-size: 15px;
    }
  }
`;

const InputField = styled.input<InputFieldProps>`
  padding: 10px;
  border-radius: 15px;
  border: solid 1px;
  outline: none;
  width: 100%;
  background-color: white;
  border: none;
  box-shadow: 0px 0px 0px 1.5px
    ${(props) => (props.invalid ? "red" : props.theme.colors.label)};
  font-size: 18px;

  &:focus {
    box-shadow: 0px 0px 0px 2px ${(props) => props.theme.colors.primary};
  }

  @media (max-width: ${windowWidth.mobile.large}) {
    font-size: 15px;
  }

`;

const HelperSpan = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.label};
  padding-left: 10px;
  padding-top: 2px;
`;

const ErrorSpan = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: red;
  padding-left: 10px;
  padding-top: 2px;
`;

export {
  InputContainer, InputField, HelperSpan, ErrorSpan
};
