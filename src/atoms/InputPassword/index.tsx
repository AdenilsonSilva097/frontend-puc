import React, { useState, memo } from "react";

import Input from "../Input";

import { FormHandles } from "../../libraries/yup";

import { InputPasswordField, InputPasswordToggle } from "./styles";

interface InputPasswordProps {
  formRef: React.RefObject<FormHandles>;
}

const InputPassword: React.FC<InputPasswordProps> = ({ formRef }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  const validatePassword = async (password: string) => {
    formRef.current?.setFieldError("password", "");

    if (password === "") { formRef.current?.setFieldError("password", "Senha obrigatória"); }
  };

  return (
    <InputPasswordField>
      <Input
        type={showPassword ? "text" : "password"}
        name="password"
        label="Senha"
        onBlur={(evt: React.ChangeEvent<HTMLInputElement>) => validatePassword(evt.target.value)}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setShowToggle(evt.target.value !== "")}
      />
      {showToggle && (
        <InputPasswordToggle onClick={() => setShowPassword((state) => !state)}>
          {showPassword ? "OCULTAR" : "MOSTRAR"}
        </InputPasswordToggle>
      )}
    </InputPasswordField>
  );
};

export default memo(InputPassword);
