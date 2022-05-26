import React from "react";
import MessengerReceipt from "../../molecules/MessengerReceipt";

import api from "../../services/api";

import { Check, Close } from "../../libraries/mui/icons";

import * as Styled from "./styles";

const MessengerReceipts: React.FC = () => {

  const [receipts, setReceipts] = React.useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

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
        const { idDoador, idMensageiro } = receipt;

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

  if (receipts.length === 0) {
    return <div>Carregando...</div>;
  }

  const handleCheckClick = () => {
    const updatedReceipts = receipts.filter((_receipt, index) => index !== currentIndex);

    console.log(updatedReceipts);
    setReceipts(updatedReceipts);

    if (currentIndex > 0) setCurrentIndex((value) => value - 1);
  };

  return (
    <Styled.Container>
      <Styled.Receipts>
        {/* {receipts.map((receipt: any) => ( */}
        <MessengerReceipt
            // key={receipt.id}
          identification={receipts[currentIndex].id}
          doador={receipts[currentIndex].doador.nome}
          endereco={receipts[currentIndex].doador.endereco}
          bairro={receipts[currentIndex].doador.bairro}
          valor={receipts[currentIndex].valor}
          idDoador={receipts[currentIndex].doador.id}
          numeroEndereco={receipts[currentIndex].doador.numeroEndereco}
          observacao={receipts[currentIndex].doador.observacoes}
          onSave={() => { console.log("onsave"); }}
        />
        {/* ))} */}
      </Styled.Receipts>
      <Styled.Buttons>
        <button type="button">Emissão de urgência</button>
        <button type="button">Atualização cadastral</button>
      </Styled.Buttons>
      <Styled.Actions>
        <div><Close fontSize="large" /></div>
        <div>
          <Check
            fontSize="large"
            onClick={handleCheckClick}
          />

        </div>
      </Styled.Actions>
      <Styled.ArrowButtons>
        <button
          type="button"
          onClick={() => setCurrentIndex((value) => value - 1)}
          disabled={currentIndex === 0}
        >
          &lt;
        </button>
        <button
          type="button"
          onClick={() => setCurrentIndex((value) => value + 1)}
          disabled={currentIndex === receipts.length - 1}
        >
          &gt;
        </button>
      </Styled.ArrowButtons>
    </Styled.Container>
  );

};

export default MessengerReceipts;
