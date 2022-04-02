import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import { useField } from "../../libraries/unform";

import {
  InputContainer, InputField, HelperSpan, ErrorSpan
} from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  name, label, helperText, ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);

  return (
    <InputContainer>
      <label htmlFor={name}>{label}</label>
      <InputField
        ref={inputRef}
        {...rest}
        invalid={error !== undefined && error !== ""}
      />
      {!error && helperText && <HelperSpan>{helperText}</HelperSpan>}
      {error && <ErrorSpan>{error}</ErrorSpan>}
    </InputContainer>
  );
};

Input.defaultProps = {
  helperText: ""
};

export default Input;
