import React from "react";

import api from "../../services/api";

import Snackbar from "../../atoms/Snackbar";

import isMobile from "../../helpers/IsMobile";

import FormDialog from "../../molecules/FormDialog";

import { Edit, Add, Print } from "../../libraries/mui/icons";
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, TableContainer
} from "../../libraries/mui/components";

import * as Styled from "./styles";
import DonorForm from "../../molecules/DonorForm";
import SearchInput from "../../molecules/SearchInput";

const Donor: React.FC = () => {

  const [donors, setDonors] = React.useState<any[]>([]);
  const [selectedDonors, setSelectedDonors] = React.useState<any[]>([]);
  const [filterDonors, setFilterDonors] = React.useState("");
  const [currentDonor, setCurrentDonor] = React.useState<any>({});
  const [openDonorForm, setOpenDonorForm] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const getDatabaseDonors = async () => {
    try {
      const { data: donorsData } = await api.get("/donors");

      setDonors(donorsData);
      setSelectedDonors(donorsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setFilterDonors(value);
  };

  const handleopenDonorForm = (donor: any) => {
    setCurrentDonor(donor);
    setOpenDonorForm(true);
  };

  const handleDonorFormClose = () => {
    setOpenDonorForm(false);
    getDatabaseDonors();
  };

  const onSaveDonor = () => {
    setSnackbarOpen(true);
    setSnackbarMessage("Doador salvo com sucesso!");
    handleDonorFormClose();
  };

  const onDeleteDonor = () => {
    setSnackbarOpen(true);
    setSnackbarMessage("Doador excluído com sucesso!");
    handleDonorFormClose();
  };

  React.useEffect(() => {
    getDatabaseDonors();
  }, []);

  React.useEffect(() => {
    const filter = donors.filter(
      (donor: any) => donor.nome.toLowerCase().includes(filterDonors.toLowerCase())
        || donor.setor.toLowerCase().includes(filterDonors.toLowerCase())
        || donor.valor.toString().toLowerCase().includes(filterDonors.toLowerCase())
        || donor.melhorData.toString().toLowerCase().includes(filterDonors.toLowerCase())
    );

    setSelectedDonors(filter);

    return () => {
      setSelectedDonors([]);
    };

  }, [filterDonors]);

  if (donors.length === 0) {
    return <div>Carregando dados...</div>;
  }

  return (
    <Styled.Container>
      <div>
        <SearchInput
          sizeInput="small"
          value={filterDonors}
          onChange={(evt) => handleSearchInputChange(evt.currentTarget.value)}
          clearInputValue={() => setFilterDonors("")}
        />
      </div>
      <TableContainer>
        <Table aria-label="permissions table">
          <TableHead sx={{ position: "sticky", top: "0", backgroundColor: "white" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Nome</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Valor</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Melhor data</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedDonors.length === 0 && (
              <TableRow>
                <TableCell align="left">Nenhum doador encontrado</TableCell>
              </TableRow>
            )}
            {selectedDonors.map((donor, index) => {

              const formattedValue = Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(donor.valor);

              return (
                <TableRow key={donor.id}>
                  <TableCell align="left">{donor.nome}</TableCell>
                  <TableCell align="left">{formattedValue}</TableCell>
                  <TableCell align="left">{donor.melhorData}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleopenDonorForm(donor)}>
                      <Edit fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <FormDialog
        onClose={handleDonorFormClose}
        open={openDonorForm}
        title="Cadastro de doador"
      >
        <DonorForm onSave={onSaveDonor} onDelete={onDeleteDonor} currentDonor={currentDonor} />
      </FormDialog>
      <Styled.FabContainer onClick={() => handleopenDonorForm(null)} size="large">
        <Add fontSize="large" />
      </Styled.FabContainer>
      <Styled.FabPrint onClick={() => window.print()} size="medium">
        <Print fontSize="medium" />
      </Styled.FabPrint>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        severity="success"
      />
    </Styled.Container>
  );
};

export default Donor;
