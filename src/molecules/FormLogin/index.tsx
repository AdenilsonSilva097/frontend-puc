import React, { useRef, useState } from "react";

import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";

import { Form, FormHandles } from "../../libraries/unform";

import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import Snackbar from "../../atoms/Snackbar";
import InputPassword from "../../atoms/InputPassword";

import api from "../../services/api";

import validations, { SignInFormData } from "../../validations/LoginValidation";

const FormLogin: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const logIn = async (email: string, password:string) => {

    try {
      const users = await api.get("/users");

      const currentUser = users.data.find(
        (user: any) => user.email === email && user.password === password
      );

      if (currentUser) {
        localStorage.setItem("@user", JSON.stringify(currentUser));
        setUserLogged(true);
        navigate("/office/dashboard");
      } else {
        setSnackbarMessage("Usuário ou senha incorretos");
        setSnackbarOpen(true);
      }

    } catch (error) {
      setSnackbarMessage("Erro ao realizar login");
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = (formData: SignInFormData) => {
    validations.validateForm(formData, formRef).then((formIsValid) => {
      if (formIsValid) {
        logIn(formData.email, formData.password);
      }
    });
  };

  const responseFailureGoogle = (response: any) => {
    console.log(response);
  };

  const responseGoogle = async (response: any) => {
    const { email, familyName, givenName } = response.profileObj;

    const userGoogleOauthRegistered = await api.get("/users").then((res) => res.data.find(
      (user: any) => user.email === email
    ));

    if (userGoogleOauthRegistered) {
      localStorage.setItem("@user", JSON.stringify(userGoogleOauthRegistered));
      setUserLogged(true);
      navigate("/office/dashboard");
    } else {

      const { data } = await api.get("/permission-groups");

      const permissionGroupOperator = data.find(
        (permissionGroup: any) => permissionGroup.name === "OPERADOR"
      );

      const newUser = {
        name: `${givenName} ${familyName}`,
        email,
        permissionGroup: permissionGroupOperator.id
      };

      await api.post("/users", newUser).then(() => {
        localStorage.setItem("@user", JSON.stringify(newUser));
        setUserLogged(true);
        navigate("/office/dashboard");
      });
    }
  };

  return (
    <>
      <Form
        ref={formRef}
        onSubmit={(formData: SignInFormData) => handleSubmit(formData)}
      >
        <Input
          type="email"
          name="email"
          label="E-mail"
          helperText="exemplo: joao@email.com.br"
          onBlur={() => validations.validateEmail(formRef.current?.getFieldValue("email"), formRef)}
        />
        <InputPassword formRef={formRef} />
        <Button caption="Login" />
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || ""}
          buttonText="Continuar com Google"
          onSuccess={responseGoogle}
          cookiePolicy="single_host_origin"
          className="google-login-button"
          onFailure={responseFailureGoogle}
        />
      </Form>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        severity={userLogged ? "success" : "error"}
      />
    </>
  );
};

export default FormLogin;
