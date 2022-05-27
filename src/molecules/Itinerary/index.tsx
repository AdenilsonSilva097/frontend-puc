import React from "react";
import ItineraryItem from "../../atoms/ItineraryItem";
import api from "../../services/api";

import * as Styled from "./styles";

import { Print } from "../../libraries/mui/icons";

const Itinerary: React.FC = () => {

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
        (receipt: any) => receipt.idMensageiro === collaboratorMessenger.id && receipt.status === "EMITIDA"
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

  if (receipts.length === 0) {
    return <div style={{ padding: "10px" }}>Nenhum itinerário a ser exibido</div>;
  }

  return (
    <Styled.Container>
      {receipts.map((receipt: any, index: number) => (
        <ItineraryItem
          key={receipt.id}
          index={index + 1}
          doador={receipt.doador.nome}
          endereco={`${receipt.doador.endereco} - ${receipt.doador.numeroEndereco}, ${receipt.doador.bairro}, ${receipt.doador.cidade} - ${receipt.doador.uf}`}
        />
      ))}
      <Styled.FabContainer onClick={() => window.print()} size="medium">
        <Print fontSize="medium" />
      </Styled.FabContainer>
    </Styled.Container>
  );
};

export default Itinerary;
