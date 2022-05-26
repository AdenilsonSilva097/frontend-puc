import React from "react";

import * as Styled from "./styles";

interface IProps {
  identification: string;
  doador: string;
  endereco: string;
  bairro: string;
  valor: number;
  idDoador: string;
  numeroEndereco: string;
  observacao: string;
  onSave: () => void;
}

const MessengerReceipt: React.FC<IProps> = ({
  bairro, doador, endereco, idDoador, identification, numeroEndereco, onSave, valor, observacao
}) => (
  <Styled.Container>
    <Styled.Infos>
      {/* <Styled.Identification>{identification}</Styled.Identification> */}
      <Styled.Info>
        <Styled.Title>Doador</Styled.Title>
        <Styled.Description>{doador}</Styled.Description>
      </Styled.Info>
      <Styled.Address>
        <Styled.Info>
          <Styled.Title>Endereço</Styled.Title>
          <Styled.Description>{`${endereco}, ${numeroEndereco}`}</Styled.Description>
        </Styled.Info>
        <Styled.Info>
          <Styled.Title>Bairro</Styled.Title>
          <Styled.Description>{bairro}</Styled.Description>
        </Styled.Info>
      </Styled.Address>
      <Styled.Info>
        <Styled.Title>Valor</Styled.Title>
        <Styled.Description>{`R$${valor}`}</Styled.Description>
      </Styled.Info>
      <Styled.Info>
        <Styled.Title>Observação</Styled.Title>
        <Styled.Description>{observacao !== "" ? observacao : "Sem observação"}</Styled.Description>
      </Styled.Info>
    </Styled.Infos>
  </Styled.Container>
);

export default MessengerReceipt;
