import React from "react";
import FormFilterToGenerateReceipts from "../../molecules/FormFilterToGenerateReceipts";

import * as Styled from "./styles";

const GenerateReceipts: React.FC = () => (
  <Styled.Container>
    <Styled.Title>Gerar novos recibos</Styled.Title>
    <FormFilterToGenerateReceipts />
  </Styled.Container>
);

export default GenerateReceipts;
