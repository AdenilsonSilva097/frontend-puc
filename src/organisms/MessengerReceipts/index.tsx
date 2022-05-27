import React from "react";

import Snackbar from "../../atoms/Snackbar";

import MessengerReceipt from "../../molecules/MessengerReceipt";

import api from "../../services/api";

import { Check, Close } from "../../libraries/mui/icons";

import * as Styled from "./styles";
import FormDialog from "../../molecules/FormDialog";
import DonorForm from "../../molecules/DonorForm";

const MessengerReceipts: React.FC = () => {

  const [receipts, setReceipts] = React.useState<any[] | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [openDonorForm, setOpenDonorForm] = React.useState<boolean>(false);
  const [currentDonor, setCurrentDonor] = React.useState<any>({});
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

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
    return <div style={{ padding: "10px" }}>Nenhuma guia para receber</div>;
  }

  const handleCloseClick = async () => {
    try {
      const response = await api.patch(`/receipts/${receipts[currentIndex].id}`, { status: "REMARCAR" });

      if (response.status === 200) {
        setSnackbarOpen(true);
        setSnackbarMessage("Guia de doação atualizada com sucesso!");
      }

      const updatedReceipts = receipts.filter((_receipt, index) => index !== currentIndex);

      if (currentIndex > 0) setCurrentIndex((value) => value - 1);

      setReceipts(updatedReceipts);

    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckClick = async () => {

    try {
      const responsePatch = await api.patch(`/receipts/${receipts[currentIndex].id}`, { status: "RECEBIDA" });

      if (responsePatch.status === 200) {
        const responsePost = await api.post("/donation-protocols", {
          idGuiaDoacao: receipts[currentIndex].id,
          valor: receipts[currentIndex].valor
        });

        if (responsePost.status === 201) {
          setSnackbarOpen(true);
          setSnackbarMessage("Guia de doação recebida com sucesso!");
        }
      }

      const updatedReceipts = receipts.filter((_receipt, index) => index !== currentIndex);

      if (currentIndex > 0) setCurrentIndex((value) => value - 1);

      setReceipts(updatedReceipts);

    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDonorButton = () => {
    setOpenDonorForm(true);
    setCurrentDonor(receipts[currentIndex].doador);
  };

  const onSaveDonorForm = () => {
    setOpenDonorForm(false);
    getDatabaseReceipts();
  };

  return (
    <Styled.Container>
      <Styled.Receipts>
        <MessengerReceipt
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
      </Styled.Receipts>
      <Styled.Buttons>
        <button type="button">Emissão de urgência</button>
        <button type="button" onClick={handleClickDonorButton}>Atualização cadastral</button>
      </Styled.Buttons>
      <Styled.Actions>
        <div>
          <Close
            fontSize="large"
            onClick={handleCloseClick}
          />
        </div>
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
      <FormDialog
        open={openDonorForm}
        onClose={() => setOpenDonorForm(false)}
        title="Atualizar cadastro do dodador"
      >
        <DonorForm
          currentDonor={currentDonor}
          onSave={onSaveDonorForm}
          onDelete={() => { /** empty */ }}
        />
      </FormDialog>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        severity="success"
      />
    </Styled.Container>
  );

};

export default MessengerReceipts;
