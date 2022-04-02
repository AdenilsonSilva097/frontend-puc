import React from "react";

import Input from "../../atoms/Input";

import { InputPasswordContainer } from "./styles";

const InputPassword: React.FC = () => (
  <InputPasswordContainer>
    <Input name="password" label="Senha" />
  </InputPasswordContainer>
);

export default InputPassword;
