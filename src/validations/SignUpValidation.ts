import * as Yup from "yup";

import { ValidationError } from "../libraries/yup";
import { FormHandles } from "../libraries/unform";

import getValidationErrors from "../hooks/getValidationErrors";

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  permissionGroup: string;
}

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Campo obrigatório"),
  email: Yup.string()
    .trim()
    .required("E-mail obrigatório")
    .email("Digite um e-mail válido"),
  password: Yup.string()
    .trim()
    .required("Senha obrigatória"),
  birthDate: Yup.date()
    .required("Campo obrigatório")
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
});

const validations = {
  validateForm: async (formData: SignUpFormData, formRef: React.RefObject<FormHandles>) => {
    try {
      await signUpSchema.validate(formData, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return false;
      }
    }

    return true;
  },
  validateName: async (name: string, formRef: React.RefObject<FormHandles>) => {
    try {
      await signUpSchema.fields.name.validate(name);
      formRef.current?.setFieldError("name", "");
    } catch (error) {
      if (error instanceof ValidationError) {
        formRef.current?.setFieldError("name", error.message);
      }
    }
  },
  validateEmail: async (email: string, formRef: React.RefObject<FormHandles>) => {
    try {
      await signUpSchema.fields.email.validate(email);
      formRef.current?.setFieldError("email", "");
    } catch (error) {
      if (error instanceof ValidationError) {
        formRef.current?.setFieldError("email", error.message);
      }
    }
  },
  validateBirthDate: async (birthDate: string, formRef: React.RefObject<FormHandles>) => {
    try {
      await signUpSchema.fields.birthDate.validate(birthDate);
      formRef.current?.setFieldError("birthDate", "");
    } catch (error) {
      if (error instanceof ValidationError) {
        formRef.current?.setFieldError("birthDate", error.message);
      }
    }
  }
};

export default validations;
