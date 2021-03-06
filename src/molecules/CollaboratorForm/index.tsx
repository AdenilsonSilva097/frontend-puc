/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import ptBrLocale from "date-fns/locale/pt-BR";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import SubmitButton from "../../atoms/SubmitButton";

import Yup from "../../libraries/yup";
import { AdapterDateFns, DatePicker, LocalizationProvider } from "../../libraries/mui/lab";
import {
  TextField, FormControl, InputLabel, Select, MenuItem,
  FormHelperText, FormControlLabel, Checkbox
} from "../../libraries/mui/components";

import { handleErrorMessage } from "../../helpers/utils";

import api from "../../services/api";

import * as Styled from "./styles";

interface IFormInputs {
  cargo: string;
  idUsuario: string;
  permissionGroup: string;
  nome: string;
  telefone: string;
  cep: string;
  endereco: string;
  numeroEndereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  setor: string;
  complemento: string;
  dataNascimento: Date | null;
  cpf: string;
  rg: string;
  inicioVinculo: Date | null;
  observacoes: string;
  inativo: boolean;
}

const schema = Yup.object().shape({
  cargo: Yup.string().required(),
  idUsuario: Yup.string().required(),
  permissionGroup: Yup.string().required(),
  nome: Yup.string().required(),
  telefone: Yup.string().required().min(10).max(11),
  cep: Yup.string().required(),
  endereco: Yup.string().required(),
  numeroEndereco: Yup.string().required(),
  cidade: Yup.string().required(),
  uf: Yup.string().required(),
  bairro: Yup.string().required(),
  setor: Yup.string().required(),
  complemento: Yup.string(),
  dataNascimento: Yup.date().required().nullable(),
  cpf: Yup.string().required(),
  rg: Yup.string(),
  inicioVinculo: Yup.date().required().nullable(),
  observacoes: Yup.string(),
  inativo: Yup.boolean()
});

interface DonorFormProps {
  currentCollaborator?: any;
  onSave: () => void;
  onDelete: () => void;
}

const CollaboratorForm: React.FC<DonorFormProps> = ({ currentCollaborator, onSave, onDelete }) => {

  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [permissions, setPermissions] = React.useState<any[]>([]);
  const [users, setUsers] = React.useState<any[]>([]);
  const [sectors, setSectors] = React.useState<any[]>([]);

  const {
    control, setValue, getValues, handleSubmit, formState: { errors: formErrors }, reset
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onBlur"
  });

  const handlePositionChange = (newValue: string) => {
    setValue("cargo", newValue);
  };

  const handleUserChange = (newValue: string) => {
    setValue("idUsuario", newValue);
  };

  const handleSectorChange = (newValue: string) => {
    setValue("setor", newValue);
  };

  const handlePermissionChange = (newValue: string) => {
    setValue("permissionGroup", newValue);
  };

  const handleSubmitForm: SubmitHandler<IFormInputs> = async (formData: IFormInputs) => {
    try {
      const newCollaborator = { ...formData };

      if (currentCollaborator) {
        await api.patch(`/collaborators/${currentCollaborator.id}`, newCollaborator);
      } else {
        await api.post("/collaborators", newCollaborator);
      }

      reset();
      onSave();

    } catch (error) {
      console.log(error);

    }
  };

  const handleClickDeleteButton = async () => {
    try {
      await api.delete(`/collaborators/${currentCollaborator.id}`);
      setShowConfirmDelete(false);
      onDelete();
    } catch (error) {

      console.log(error);
    }
  };

  React.useEffect(() => {
    (async () => {
      const { data: permissionsData } = await api.get("/permission-groups");
      const { data: sectorsData } = await api.get("/sectors");
      const { data: usersData } = await api.get("/users");

      setPermissions(permissionsData);
      setSectors(sectorsData);
      setUsers(usersData);
    })();
  }, []);

  // load current collaborator data
  React.useEffect(() => {
    if (currentCollaborator) {
      setValue("cargo", currentCollaborator.cargo);
      setValue("idUsuario", currentCollaborator.idUsuario);
      setValue("permissionGroup", currentCollaborator.permissionGroup);
      setValue("nome", currentCollaborator.nome);
      setValue("telefone", currentCollaborator.telefone);
      setValue("cep", currentCollaborator.cep);
      setValue("endereco", currentCollaborator.endereco);
      setValue("numeroEndereco", currentCollaborator.numeroEndereco);
      setValue("cidade", currentCollaborator.cidade);
      setValue("uf", currentCollaborator.uf);
      setValue("bairro", currentCollaborator.bairro);
      setValue("setor", currentCollaborator.setor);
      setValue("complemento", currentCollaborator.complemento);
      setValue("dataNascimento", currentCollaborator.dataNascimento);
      setValue("cpf", currentCollaborator.cpf);
      setValue("rg", currentCollaborator.rg);
      setValue("inicioVinculo", currentCollaborator.inicioVinculo);
      setValue("observacoes", currentCollaborator.observacoes);
      setValue("inativo", currentCollaborator.inativo);
    }
  }, [currentCollaborator]);

  return (
    <Styled.Container>
      <Styled.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Styled.FormFields>
          <Controller
            name="cargo"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl size="small" error={!!formErrors.cargo} className="field" sx={{ width: "200px" }}>
                <InputLabel id="permission-select">Cargo</InputLabel>
                <Select
                  {...field}
                  labelId="permission-select"
                  label="Cargo"
                  error={!!formErrors.cargo}
                  onChange={(e) => handlePositionChange(e.target.value)}
                  size="small"
                >
                  {permissions.map((permission) => (
                    <MenuItem key={permission.id} value={permission.id}>
                      {permission.name}
                    </MenuItem>
                  ))}
                </Select>
                {!!formErrors.cargo
                    && (
                    <FormHelperText>
                      {handleErrorMessage(formErrors.cargo)}
                    </FormHelperText>
                    )}
              </FormControl>
            )}
          />
          <Controller
            name="idUsuario"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl size="small" error={!!formErrors.idUsuario} className="field" sx={{ width: "200px" }}>
                <InputLabel id="permission-select">Usu??rio</InputLabel>
                <Select
                  {...field}
                  labelId="user-select"
                  label="Usu??rio"
                  error={!!formErrors.idUsuario}
                  onChange={(e) => handleUserChange(e.target.value)}
                  size="small"
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
                {!!formErrors.idUsuario
                    && (
                    <FormHelperText>
                      {handleErrorMessage(formErrors.idUsuario)}
                    </FormHelperText>
                    )}
              </FormControl>
            )}
          />
          <Controller
            name="permissionGroup"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl size="small" error={!!formErrors.permissionGroup} className="field" sx={{ width: "200px" }}>
                <InputLabel id="permission-select">Permiss??o</InputLabel>
                <Select
                  {...field}
                  labelId="permission-select"
                  label="Permiss??o"
                  error={!!formErrors.permissionGroup}
                  onChange={(e) => handlePermissionChange(e.target.value)}
                  size="small"
                >
                  {permissions.map((permission) => (
                    <MenuItem key={permission.id} value={permission.id}>
                      {permission.name}
                    </MenuItem>
                  ))}
                </Select>
                {!!formErrors.permissionGroup
                    && (
                    <FormHelperText>
                      {handleErrorMessage(formErrors.permissionGroup)}
                    </FormHelperText>
                    )}
              </FormControl>
            )}
          />
          <Controller
            name="nome"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="Nome"
                variant="outlined"
                error={!!formErrors.nome}
                helperText={handleErrorMessage(formErrors.nome)}
                className="field"
                sx={{ width: "400px" }}
                size="small"
              />
            )}
          />
          <Controller
            name="telefone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="Telefone"
                variant="outlined"
                error={!!formErrors.telefone}
                type="tel"
                helperText={handleErrorMessage(formErrors.telefone)}
                inputProps={{ maxLength: 11 }}
                className="field"
                sx={{ width: "50px" }}
                size="small"
              />
            )}
          />
          <Controller
            name="cep"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="CEP"
                variant="outlined"
                error={!!formErrors.cep}
                helperText={handleErrorMessage(formErrors.cep)}
                className="field"
                sx={{ width: "50px" }}
                size="small"
              />
            )}
          />
          <Controller
            name="endereco"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="Endere??o"
                variant="outlined"
                error={!!formErrors.endereco}
                helperText={handleErrorMessage(formErrors.endereco)}
                className="field"
                sx={{ width: "500px" }}
                size="small"
              />
            )}
          />
          <Controller
            name="numeroEndereco"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="N??mero"
                variant="outlined"
                error={!!formErrors.numeroEndereco}
                helperText={handleErrorMessage(formErrors.numeroEndereco)}
                className="field"
                sx={{ width: "50px" }}
                size="small"
              />
            )}
          />
          <Controller
            name="cidade"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="Cidade"
                variant="outlined"
                error={!!formErrors.cidade}
                helperText={handleErrorMessage(formErrors.cidade)}
                className="field"
                sx={{ width: "350px" }}
                size="small"
              />
            )}
          />
          <Controller
            name="uf"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="UF"
                variant="outlined"
                error={!!formErrors.uf}
                helperText={handleErrorMessage(formErrors.uf)}
                inputProps={{ maxLength: 2 }}
                className="field"
                sx={{ width: "50px" }}
                size="small"
              />
            )}
          />
          <Controller
            name="bairro"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="Bairro"
                variant="outlined"
                error={!!formErrors.bairro}
                helperText={handleErrorMessage(formErrors.bairro)}
                className="field"
                size="small"
              />
            )}
          />
          <Controller
            name="setor"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl size="small" error={!!formErrors.setor} className="field" sx={{ width: "200px" }}>
                <InputLabel id="sector-select">Setor</InputLabel>
                <Select
                  {...field}
                  labelId="sector-select"
                  label="Setor"
                  error={!!formErrors.setor}
                  onChange={(e) => handleSectorChange(e.target.value)}
                  size="small"
                >
                  {sectors.map((sector) => (
                    <MenuItem key={sector.id} value={sector.id}>
                      {sector.nome}
                    </MenuItem>
                  ))}
                </Select>
                {!!formErrors.setor
                    && (
                    <FormHelperText>
                      {handleErrorMessage(formErrors.setor)}
                    </FormHelperText>
                    )}
              </FormControl>
            )}
          />
          <Controller
            name="complemento"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="Complemento"
                variant="outlined"
                error={!!formErrors.complemento}
                helperText={handleErrorMessage(formErrors.complemento)}
                className="field"
                size="small"
              />
            )}
          />
          <Controller
            name="dataNascimento"
            control={control}
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocale}>
                <DatePicker
                  value={value}
                  label="Data de nascimento"
                  onChange={(newDate) => onChange(newDate)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!formErrors.dataNascimento}
                      helperText={handleErrorMessage(formErrors.dataNascimento)}
                      className="field"
                      sx={{ width: "200px" }}
                      size="small"
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="cpf"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="CPF"
                variant="outlined"
                error={!!formErrors.cpf}
                helperText={handleErrorMessage(formErrors.cpf)}
                className="field"
                size="small"
              />
            )}
          />
          <Controller
            name="rg"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="RG"
                variant="outlined"
                error={!!formErrors.rg}
                helperText={handleErrorMessage(formErrors.rg)}
                className="field"
                sx={{ width: "150px" }}
                size="small"
              />
            )}
          />
          <Controller
            name="inicioVinculo"
            control={control}
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocale}>
                <DatePicker
                  label="In??cio v??nculo"
                  value={value}
                  onChange={(ndate) => onChange(ndate)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!formErrors.inicioVinculo}
                      helperText={handleErrorMessage(formErrors.inicioVinculo)}
                      className="field"
                      sx={{ width: "200px" }}
                      size="small"
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="observacoes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="Observa????es"
                variant="outlined"
                error={!!formErrors.observacoes}
                helperText={handleErrorMessage(formErrors.observacoes)}
                className="field"
                size="small"
              />
            )}
          />
          <Controller
            name="inativo"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox value={field.value} />}
                label="Inativar colaborador"
                sx={{ paddingBottom: "10px" }}
              />
            )}
          />
        </Styled.FormFields>
        <Styled.FormActions>
          <SubmitButton text="Confirmar" />
          {!showConfirmDelete && currentCollaborator
            && (
            <Styled.DeleteButton variant="outlined" onClick={() => setShowConfirmDelete(true)}>
              Excluir
            </Styled.DeleteButton>
            )}
          {showConfirmDelete && (
            <Styled.DeleteButton variant="outlined" onClick={handleClickDeleteButton}>
              Efetivar exclus??o
            </Styled.DeleteButton>
          )}
        </Styled.FormActions>
      </Styled.Form>
    </Styled.Container>
  );
};

CollaboratorForm.defaultProps = {
  currentCollaborator: null
};

export default CollaboratorForm;
