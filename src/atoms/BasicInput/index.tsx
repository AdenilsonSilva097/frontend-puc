import React, { InputHTMLAttributes } from "react";

import {
  InputContainer, InputField, HelperSpan, ErrorSpan
} from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  helperText?: string;
  error: string | undefined;
}

const BasicInput: React.FC<InputProps> = ({
  name, label, helperText, error, ...rest
}) => (
  <InputContainer>
    <label htmlFor={name}>{label}</label>
    <InputField
      {...rest}
      invalid={error !== undefined && error !== ""}
    />
    {!error && helperText && <HelperSpan>{helperText}</HelperSpan>}
    {error && <ErrorSpan>{error}</ErrorSpan>}
  </InputContainer>
);

BasicInput.defaultProps = {
  helperText: ""
};

export default BasicInput;
