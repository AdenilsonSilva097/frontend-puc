import React from "react";

import api from "../../services/api";

import Snackbar from "../../atoms/Snackbar";

import isMobile from "../../helpers/IsMobile";

import FormDialog from "../../molecules/FormDialog";

import { Edit, Add } from "../../libraries/mui/icons";
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, TableContainer
} from "../../libraries/mui/components";

import * as Styled from "./styles";
import DonorForm from "../../molecules/DonorForm";

const Donor: React.FC = () => {

  const [donors, setDonors] = React.useState<any[]>([]);
  const [currentDonor, setCurrentDonor] = React.useState<any>({});
  const [openDonorForm, setOpenDonorForm] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const getDatabaseDonors = async () => {
    try {
      const { data: donorsData } = await api.get("/donors");

      setDonors(donorsData);
    } catch (error) {
      console.log(error);
    }
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
    handleDonorFormClose();
  };

  React.useEffect(() => {
    getDatabaseDonors();
  }, []);

  if (donors.length === 0) {
    return <div>Carregando dados...</div>;
  }

  return (
    <Styled.Container>
      <TableContainer>
        <Table aria-label="permissions table">
          <TableHead sx={{ position: "sticky", top: "0", backgroundColor: "white" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Nome</TableCell>
              {!isMobile()
                && <TableCell sx={{ fontWeight: "bold" }} align="left">Setor</TableCell>}
              <TableCell sx={{ fontWeight: "bold" }} align="left">Valor</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Melhor data</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {donors.map((donor, index) => {

              const formattedValue = Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(donor.valor);

              return (
                <TableRow key={donor.id}>
                  <TableCell align="left">{donor.nome}</TableCell>
                  {!isMobile()
                    && <TableCell align="left">{donor.setor}</TableCell>}
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
        <DonorForm onSave={onSaveDonor} currentDonor={currentDonor} />
      </FormDialog>
      <Styled.FabContainer onClick={() => handleopenDonorForm(null)} size="large">
        <Add fontSize="large" />
      </Styled.FabContainer>
      <Snackbar
        open={snackbarOpen}
        message={!currentDonor ? "Doador criado com sucesso!" : "Doador alterado com sucesso!"}
        onClose={() => setSnackbarOpen(false)}
        severity="success"
      />
    </Styled.Container>
  );
};

export default Donor;
