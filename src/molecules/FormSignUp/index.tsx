import React, { useRef, useState } from "react";

import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import InputPassword from "../../atoms/InputPassword";
import Snackbar from "../../atoms/Snackbar";

import { Form, FormHandles } from "../../libraries/unform";

import api from "../../services/api";

import validations, { SignUpFormData } from "../../validations/SignUpValidation";

const FormSignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [userRegistered, setUserRegistered] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (formData: SignUpFormData) => {
    validations.validateForm(formData, formRef).then(async (formIsValid) => {
      if (formIsValid) {

        try {
          const { data } = await api.get("/permission-groups");

          const permissionGroupOperator = data.find(
            (permissionGroup: any) => permissionGroup.name === "OPERADOR"
          );

          const newUser = { ...formData, permissionGroup: permissionGroupOperator.id };

          await api.post("/users", newUser);

          setUserRegistered(true);
          formRef.current?.reset();

        } catch (error) {
          setUserRegistered(false);

        } finally {
          setSnackbarOpen(true);
        }

      }
    });
  };

  return (
    <>
      <Form
        ref={formRef}
        onSubmit={(formData: SignUpFormData) => handleSubmit(formData)}
      >
        <Input
          type="text"
          name="name"
          label="Nome completo"
          onBlur={() => validations.validateName(formRef.current?.getFieldValue("name"), formRef)}
        />
        <Input
          type="email"
          name="email"
          label="E-mail"
          helperText="exemplo: joao@email.com.br"
          onBlur={() => validations.validateEmail(formRef.current?.getFieldValue("email"), formRef)}
        />
        <InputPassword formRef={formRef} />
        <Input
          type="date"
          name="birthDate"
          label="Data de nascimento"
          onBlur={() => validations.validateBirthDate(formRef.current?.getFieldValue("birthDate"), formRef)}
        />
        <Button caption="Criar conta" />
      </Form>
      <Snackbar
        open={snackbarOpen}
        message={userRegistered ? "Usuário criado com sucesso!" : "Erro ao criar usuário"}
        onClose={() => setSnackbarOpen(false)}
        severity={userRegistered ? "success" : "error"}
      />
    </>
  );
};

export default FormSignUp;
