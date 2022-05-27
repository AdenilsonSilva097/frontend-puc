import React from "react";

import _ from "lodash";
import api from "../../services/api";

import Snackbar from "../../atoms/Snackbar";

import FormDialog from "../../molecules/FormDialog";
import SearchInput from "../../molecules/SearchInput";
import SectorForm from "../../molecules/SectorForm";

import { Edit, Add, Print } from "../../libraries/mui/icons";
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, TableContainer
} from "../../libraries/mui/components";

import * as Styled from "./styles";

const Sector: React.FC = () => {

  const [sectors, setSectors] = React.useState<any[]>([]);
  const [selectedSectors, setSelectedSectors] = React.useState<any[]>([]);
  const [filterSectors, setFilterSectors] = React.useState("");
  const [currentSector, setCurrentSector] = React.useState<any>({});
  const [openSectorForm, setOpenSectorForm] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const getDatabaseSectors = async () => {
    try {
      const { data: sectorsData } = await api.get("/sectors");

      const sectorsWithAddresses = await Promise.all(sectorsData.map(async (sector: any) => {
        const { data: addresses } = await api.get(`/sector-addresses/sector/${sector.id}`);

        return {
          ...sector,
          addresses: [...addresses]
        };
      }));

      setSectors(sectorsWithAddresses);
      setSelectedSectors(sectorsWithAddresses);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setFilterSectors(value);
  };

  const handleopenSectorForm = (sector: any) => {
    setCurrentSector(sector);
    setOpenSectorForm(true);
  };

  const handleSectorFormClose = () => {
    setOpenSectorForm(false);
    getDatabaseSectors();
  };

  const onSaveSector = () => {
    if (currentSector !== null) {
      setSnackbarOpen(true);
      setSnackbarMessage("Setor salvo com sucesso!");
    }
    handleSectorFormClose();
  };

  const onDeleteSector = () => {
    setSnackbarOpen(true);
    setSnackbarMessage("Setor excluído com sucesso!");
    handleSectorFormClose();
  };

  React.useEffect(() => {
    getDatabaseSectors();
  }, []);

  React.useEffect(() => {
    const filter = sectors.filter(
      (sector: any) => sector.nome.toLowerCase()
        .includes(filterSectors.toLowerCase())
    );

    setSelectedSectors(filter);

    return () => {
      setSelectedSectors([]);
    };

  }, [filterSectors]);

  return (
    <Styled.Container>
      <div>
        <SearchInput
          sizeInput="small"
          value={filterSectors}
          onChange={(evt) => handleSearchInputChange(evt.currentTarget.value)}
          clearInputValue={() => setFilterSectors("")}
        />
      </div>
      <TableContainer>
        <Table aria-label="permissions table">
          <TableHead sx={{ position: "sticky", top: "0", backgroundColor: "white" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Nome</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Qtde endereços</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedSectors.length === 0 && (
              <TableRow>
                <TableCell align="left">Nenhum setor encontrado</TableCell>
                <TableCell align="left" />
                <TableCell align="left" />
              </TableRow>
            )}
            {selectedSectors.map((sector, index) => (
              <TableRow key={sector.id}>
                <TableCell align="left">{sector.nome}</TableCell>
                <TableCell align="left">{sector.addresses.length}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleopenSectorForm(sector)}>
                    <Edit fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormDialog
        onClose={handleSectorFormClose}
        open={openSectorForm}
        title="Cadastro de setor"
      >
        <SectorForm
          onSave={onSaveSector}
          onDelete={onDeleteSector}
          currentSector={currentSector}
        />
      </FormDialog>
      <Styled.FabContainer onClick={() => handleopenSectorForm(null)} size="large">
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

export default Sector;
