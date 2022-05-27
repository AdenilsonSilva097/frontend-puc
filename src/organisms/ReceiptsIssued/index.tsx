import React from "react";

import api from "../../services/api";

import Snackbar from "../../atoms/Snackbar";

import isMobile from "../../helpers/IsMobile";

import FormDialog from "../../molecules/FormDialog";

import { Delete } from "../../libraries/mui/icons";
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, TableContainer
} from "../../libraries/mui/components";

import * as Styled from "./styles";
import DonorForm from "../../molecules/DonorForm";
import SearchInput from "../../molecules/SearchInput";

const ReceiptsIssued: React.FC = () => {
  const [receipts, setReceipts] = React.useState<any[]>([]);
  const [selectedReceipts, setSelectedReceipts] = React.useState<any[]>([]);
  const [filterReceipts, setFilterReceipts] = React.useState("");
  const [currentReceipt, setCurrentReceipt] = React.useState<any>({});
  const [openReceiptForm, setOpenReceiptForm] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const getDatabaseReceipts = async () => {
    try {
      const { data: receiptsData } = await api.get("/receipts");
      const { data: donorData } = await api.get("/donors");
      const { data: messengerData } = await api.get("/collaborators");

      const receiptsWithDonorAndMessenger = receiptsData.map((receipt: any) => {
        const { idDoador, idMensageiro } = receipt;

        const donorFound = donorData.find((donor: any) => donor.id === idDoador);
        const messengerFound = messengerData.find(
          (messenger: any) => messenger.id === idMensageiro
        );

        return {
          ...receipt,
          doador: donorFound ? donorFound.nome : "",
          mensageiro: messengerFound ? messengerFound.nome : ""
        };
      });

      setReceipts(receiptsWithDonorAndMessenger);
      setSelectedReceipts(receiptsWithDonorAndMessenger);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setFilterReceipts(value);
  };

  const handleClickDeleteReceipt = async (idToDelete: string) => {
    try {
      await api.delete(`/receipts/${idToDelete}`);
      setSnackbarOpen(true);
      setSnackbarMessage("Recibo excluído com sucesso!");
      const updatedSelectedReceipts = selectedReceipts.filter(
        (receipt: any) => receipt.id !== idToDelete
      );

      setSelectedReceipts(updatedSelectedReceipts);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getDatabaseReceipts();
  }, []);

  React.useEffect(() => {
    const filter = receipts.filter(
      (receipt: any) => receipt.doador.toLowerCase().includes(filterReceipts.toLowerCase())
        || receipt.status.toLowerCase().includes(filterReceipts.toLowerCase())
        || receipt.dataEmissao.toString().toLowerCase().includes(filterReceipts.toLowerCase())
        || receipt.valor.toString().toLowerCase().includes(filterReceipts.toLowerCase())
    );

    setSelectedReceipts(filter);

    return () => {
      setSelectedReceipts([]);
    };

  }, [filterReceipts]);

  return (
    <Styled.Container>
      <div>
        <SearchInput
          sizeInput="small"
          value={filterReceipts}
          onChange={(evt) => handleSearchInputChange(evt.currentTarget.value)}
          clearInputValue={() => setFilterReceipts("")}
        />
      </div>
      <TableContainer>
        <Table aria-label="permissions table">
          <TableHead sx={{ position: "sticky", top: "0", backgroundColor: "white" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Doador</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Mensageiro</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Emissão</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Valor</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedReceipts.length === 0 && (
              <TableRow>
                <TableCell align="left">Nenhum recibo encontrado</TableCell>
              </TableRow>
            )}
            {selectedReceipts.map((receipt, index) => {

              const formattedValue = Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(receipt.valor);

              const dataEmissao = receipt.dataEmissao as string;

              const data = dataEmissao.split("T")[0];

              return (
                <TableRow key={receipt.id}>
                  <TableCell align="left">{receipt.doador}</TableCell>
                  {!isMobile() && (
                  <TableCell align="left">{receipt.mensageiro}</TableCell>)}
                  <TableCell align="left">
                    <Styled.Status status={receipt.status}>{receipt.status}</Styled.Status>
                  </TableCell>
                  <TableCell align="left">{data}</TableCell>
                  <TableCell align="left">{formattedValue}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleClickDeleteReceipt(receipt.id)} disabled={receipt.status === "RECEBIDA"}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        severity="success"
      />
    </Styled.Container>
  );
};

export default ReceiptsIssued;
