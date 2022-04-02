import React from "react";
import { Link } from "react-router-dom";

import EmpatieseLogotipo from "../../atoms/EmpatieseLogotipo";

import FormSignUp from "../../molecules/FormSignUp";

import {
  SignUpContainer,
  SignUpBannerContainer,
  SignUpFormContainer,
  SignUpLoginContainer,
  SignUpFormContent
} from "./styles";

const SignUp: React.FC = () => (
  <SignUpContainer>
    <SignUpFormContainer>
      <span>
        Crie sua
        <br />
        nova conta
      </span>
      <SignUpFormContent>
        <FormSignUp />
        <SignUpLoginContainer>
          Já tem uma conta?
          <wbr />
          <Link to="/"> Faça login</Link>
        </SignUpLoginContainer>
      </SignUpFormContent>
    </SignUpFormContainer>
    <SignUpBannerContainer>
      <span>Boas-vindas</span>
      <EmpatieseLogotipo color="secondary" />
    </SignUpBannerContainer>
  </SignUpContainer>
);

export default SignUp;
