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
import CollaboratorForm from "../../molecules/CollaboratorForm";
import SearchInput from "../../molecules/SearchInput";

const Collaborator: React.FC = () => {

  const [collaborators, setCollaborators] = React.useState<any[]>([]);
  const [selectedCollaborators, setSelectedCollaborators] = React.useState<any[]>([]);
  const [filterCollaborators, setFilterCollaborators] = React.useState("");
  const [currentCollaborator, setCurrentCollaborator] = React.useState<any>({});
  const [openCollaboratorForm, setOpenCollaboratorForm] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const getDatabaseCollaborators = async () => {
    try {
      const { data: collaboratorsData } = await api.get("/collaborators");

      setCollaborators(collaboratorsData);
      setSelectedCollaborators(collaboratorsData);
    } catch (error) {

      console.log(error);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setFilterCollaborators(value);
  };

  const handleopenCollaboratorForm = (collaborator: any) => {
    setCurrentCollaborator(collaborator);
    setOpenCollaboratorForm(true);
  };

  const handleCollaboratorFormClose = () => {
    setOpenCollaboratorForm(false);
    getDatabaseCollaborators();
  };

  const onSaveCollaborator = () => {
    setSnackbarOpen(true);
    setSnackbarMessage("Colaborador salvo com sucesso!");
    handleCollaboratorFormClose();
  };

  const onDeleteCollaborator = () => {
    setSnackbarOpen(true);
    setSnackbarMessage("Colaborador excluído com sucesso!");
    handleCollaboratorFormClose();
  };

  React.useEffect(() => {
    getDatabaseCollaborators();
  }, []);

  React.useEffect(() => {
    const filter = collaborators.filter(
      (collaborator: any) => collaborator.nome.toLowerCase()
        .includes(filterCollaborators.toLowerCase())
        || collaborator.telefone.toLowerCase()
          .includes(filterCollaborators.toLowerCase())
        || collaborator.cpf.toString().toLowerCase()
          .includes(filterCollaborators.toLowerCase())
        || collaborator.observacoes.toString().toLowerCase()
          .includes(filterCollaborators.toLowerCase())
    );

    setSelectedCollaborators(filter);
  }, [filterCollaborators]);

  if (collaborators.length === 0) {
    return <div>Carregando dados...</div>;
  }

  return (
    <Styled.Container>
      <div>
        <SearchInput
          sizeInput="small"
          value={filterCollaborators}
          onChange={(evt) => handleSearchInputChange(evt.currentTarget.value)}
          clearInputValue={() => setFilterCollaborators("")}
        />
      </div>
      <TableContainer>
        <Table aria-label="permissions table">
          <TableHead sx={{ position: "sticky", top: "0", backgroundColor: "white" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Nome</TableCell>
              {!isMobile()
                && <TableCell sx={{ fontWeight: "bold" }} align="left">Telefone</TableCell>}
              <TableCell sx={{ fontWeight: "bold" }} align="left">CPF</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">Observações</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedCollaborators.length === 0 && (
              <TableRow>
                <TableCell align="left">Nenhum colaborador encontrado</TableCell>
              </TableRow>
            )}
            {selectedCollaborators.map((collaborator, index) => (
              <TableRow key={collaborator.id}>
                <TableCell align="left">{collaborator.nome}</TableCell>
                {!isMobile()
                    && <TableCell align="left">{collaborator.telefone}</TableCell>}
                <TableCell align="left">{collaborator.cpf}</TableCell>
                <TableCell align="left">{collaborator.observacoes}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleopenCollaboratorForm(collaborator)}>
                    <Edit fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormDialog
        onClose={handleCollaboratorFormClose}
        open={openCollaboratorForm}
        title="Cadastro de colaborador"
      >
        <CollaboratorForm
          onSave={onSaveCollaborator}
          onDelete={onDeleteCollaborator}
          currentCollaborator={currentCollaborator}
        />
      </FormDialog>
      <Styled.FabContainer onClick={() => handleopenCollaboratorForm(null)} size="large">
        <Add fontSize="large" />
      </Styled.FabContainer>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        severity="success"
      />
    </Styled.Container>
  );
};

export default Collaborator;
