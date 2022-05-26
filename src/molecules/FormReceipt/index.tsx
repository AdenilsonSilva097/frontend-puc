import React from "react";

import Yup from "../../libraries/yup";

import * as Styled from "./styles";

interface IFormInputs {
  valor: number;
  mensageiro: string;
}

const schema = Yup.object().shape({
  valor: Yup.number().required(),
  mensageiro: Yup.string().required()
});

const FormReceipt: React.FC = () => <div />;

export default FormReceipt;
