import React from "react";
import { Link } from "react-router-dom";

import EmpatieseLogotipo from "../../atoms/EmpatieseLogotipo";
import FormLogin from "../../molecules/FormLogin";

import {
  LoginContainer,
  LoginBannerContainer,
  LoginFormContainer,
  LoginFormContent,
  LoginSignUpContainer
} from "./styles";

const Login: React.FC = () => (
  <LoginContainer>
    <LoginBannerContainer>
      <EmpatieseLogotipo color="secondary" />
    </LoginBannerContainer>
    <LoginFormContainer>
      <span>Login</span>
      <LoginFormContent>
        <FormLogin />
        <LoginSignUpContainer>
          Novo usuário?
          <Link to="register"> Cadastre-se</Link>
        </LoginSignUpContainer>
      </LoginFormContent>
    </LoginFormContainer>
  </LoginContainer>
);

export default Login;
