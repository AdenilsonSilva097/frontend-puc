import * as Yup from "yup";

import { ValidationError } from "../libraries/yup";
import { FormHandles } from "../libraries/unform";

import getValidationErrors from "../hooks/getValidationErrors";

export interface SignInFormData {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("E-mail obrigatório")
    .email("Digite um e-mail válido"),
  password: Yup.string()
    .trim()
    .required("Senha obrigatória")
});

const validations = {
  validateForm: async (formData: SignInFormData, formRef: React.RefObject<FormHandles>) => {
    try {
      await loginSchema.validate(formData, { abortEarly: false });

    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return false;
      }
    }

    return true;
  },
  validateEmail: async (email: string, formRef: React.RefObject<FormHandles>) => {
    try {
      await loginSchema.fields.email.validate(email);
      formRef.current?.setFieldError("email", "");
    } catch (error) {
      if (error instanceof ValidationError) {
        formRef.current?.setFieldError("email", error.message);
      }
    }
  }
};

export default validations;
