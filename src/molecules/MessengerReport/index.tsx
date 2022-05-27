import React from "react";

import api from "../../services/api";

import { Print } from "../../libraries/mui/icons";

import * as Styled from "./styles";

const MessengerReport: React.FC = () => {

  const [receipts, setReceipts] = React.useState<any[] | null>(null);

  const loggedUser = JSON.parse(localStorage.getItem("@user")!);

  const getDatabaseReceipts = async () => {
    try {
      const { data: collaboratorsData } = await api.get("/collaborators");
      const { data: donorData } = await api.get("/donors");
      const { data: receiptsData } = await api.get("/receipts");

      const collaboratorMessenger = collaboratorsData.find(
        (collaborator: any) => collaborator.nome.toUpperCase() === loggedUser.name.toUpperCase()
      );

      const filteredReceipts = receiptsData.filter(
        (receipt: any) => receipt.idMensageiro === collaboratorMessenger.id
      );

      const receiptsWithDonorAndMessenger = filteredReceipts.map((receipt: any) => {
        const { idDoador } = receipt;

        const donorFound = donorData.find((donor: any) => donor.id === idDoador);

        return {
          ...receipt,
          doador: donorFound
        };
      });

      setReceipts(receiptsWithDonorAndMessenger);

    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getDatabaseReceipts();

    return () => {
      setReceipts([]);
    };
  }, []);

  if (!receipts) {
    return <div style={{ padding: "10px" }}>Carregando...</div>;
  }

  const total = receipts.reduce((acc: number, receipt: any) => acc + receipt.valor, 0);
  const totalRecebido = receipts.reduce((acc: number, receipt: any) => (receipt.status === "RECEBIDA" ? acc + receipt.valor : acc), 0);
  const totalARemarcar = receipts.reduce((acc: number, receipt: any) => (receipt.status === "REMARCAR" ? acc + receipt.valor : acc), 0);
  const totalAReceber = receipts.reduce((acc: number, receipt: any) => (receipt.status === "EMITIDA" ? acc + receipt.valor : acc), 0);

  return (
    <Styled.Container>
      <Styled.Title>Total</Styled.Title>
      <Styled.Description>{`R$ ${Number(total).toFixed(2)}`}</Styled.Description>
      <Styled.Title>A Receber</Styled.Title>
      <Styled.Description>{`R$ ${Number(totalAReceber).toFixed(2)}`}</Styled.Description>
      <Styled.Title>Recebidos</Styled.Title>
      <Styled.Description>{`R$ ${Number(totalRecebido).toFixed(2)}`}</Styled.Description>
      <Styled.Title>Remarcados</Styled.Title>
      <Styled.Description>{`R$ ${Number(totalARemarcar).toFixed(2)}`}</Styled.Description>
      <Styled.FabContainer onClick={() => window.print()} size="medium">
        <Print fontSize="medium" />
      </Styled.FabContainer>
    </Styled.Container>
  );
};

export default MessengerReport;
