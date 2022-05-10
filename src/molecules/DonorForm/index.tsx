/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import ptBrLocale from "date-fns/locale/pt-BR";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import SubmitButton from "../../atoms/SubmitButton";
import NumberFormatCustom from "../../atoms/NumberFormat";

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
  valor: number;
  frequencia: string;
  melhorData: number;
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
  inicioDoacao: Date | null;
  observacoes: string;
  inativo: boolean;
}

const schema = Yup.object().shape({
  valor: Yup.number().required(),
  frequencia: Yup.string().required(),
  melhorData: Yup.number().min(1).max(31).required(),
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
  inicioDoacao: Yup.date().required().nullable(),
  observacoes: Yup.string(),
  inativo: Yup.boolean()
});

interface DonorFormProps {
  currentDonor?: any;
  onSave: () => void;
  onDelete: () => void;
}

const DonorForm: React.FC<DonorFormProps> = ({ currentDonor, onSave, onDelete }) => {

  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);

  const {
    control, setValue, handleSubmit, formState: { errors: formErrors }, reset
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onBlur"
  });

  const handleFrequencyChange = (newValue: string) => {
    setValue("frequencia", newValue);
  };

  const handleSubmitForm: SubmitHandler<IFormInputs> = async (formData: IFormInputs) => {
    try {
      const newDonor = { ...formData };

      if (currentDonor) {
        await api.patch(`/donors/${currentDonor.id}`, newDonor);
      } else {
        await api.post("/donors", newDonor);
      }

      reset();
      onSave();

    } catch (error) {
      console.log(error);

    }
  };

  const handleClickDeleteButton = async () => {
    try {
      await api.delete(`/donors/${currentDonor.id}`);
      setShowConfirmDelete(false);
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };

  // load current donor data
  React.useEffect(() => {
    if (currentDonor) {
      setValue("valor", currentDonor.valor);
      setValue("frequencia", currentDonor.frequencia);
      setValue("melhorData", currentDonor.melhorData);
      setValue("nome", currentDonor.nome);
      setValue("telefone", currentDonor.telefone);
      setValue("cep", currentDonor.cep);
      setValue("endereco", currentDonor.endereco);
      setValue("numeroEndereco", currentDonor.numeroEndereco);
      setValue("cidade", currentDonor.cidade);
      setValue("uf", currentDonor.uf);
      setValue("bairro", currentDonor.bairro);
      setValue("setor", currentDonor.setor);
      setValue("complemento", currentDonor.complemento);
      setValue("dataNascimento", currentDonor.dataNascimento);
      setValue("cpf", currentDonor.cpf);
      setValue("rg", currentDonor.rg);
      setValue("inicioDoacao", currentDonor.inicioDoacao);
      setValue("observacoes", currentDonor.observacoes);
      setValue("inativo", currentDonor.inativo);
    }
  }, [currentDonor]);

  return (
    <Styled.Container>
      {/* <span>Cadastro de doador</span> */}
      <Styled.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Styled.FormFields>
          <Controller
            name="valor"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="Valor"
                variant="outlined"
                error={!!formErrors.valor}
                helperText={handleErrorMessage(formErrors.valor)}
                InputProps={{
                  inputComponent: NumberFormatCustom as any
                }}
                className="field"
                sx={{ width: "50px" }}
              />
            )}
          />
          <Controller
            name="frequencia"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl error={!!formErrors.frequencia} className="field" sx={{ width: "100px" }}>
                <InputLabel id="frequency-select">Frequência</InputLabel>
                <Select
                  {...field}
                  labelId="frequency-select"
                  label="Frequência"
                  error={!!formErrors.frequencia}
                  onChange={(e) => handleFrequencyChange(e.target.value)}
                >
                  <MenuItem value="SEMANAL">Semanal</MenuItem>
                  <MenuItem value="QUINZENAL">Quinzenal</MenuItem>
                  <MenuItem value="MENSAL">Mensal</MenuItem>
                  <MenuItem value="BIMENSAL">Bimensal</MenuItem>
                </Select>
                {!!formErrors.frequencia
                  && <FormHelperText>{handleErrorMessage(formErrors.frequencia)}</FormHelperText>}
              </FormControl>
            )}
          />
          <Controller
            name="melhorData"
            control={control}
            defaultValue={1}
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="Melhor data"
                variant="outlined"
                error={!!formErrors.melhorData}
                helperText={handleErrorMessage(formErrors.melhorData)}
                className="field"
                type="number"
                sx={{ width: "100px" }}
              />
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
                label="Endereço"
                variant="outlined"
                error={!!formErrors.endereco}
                helperText={handleErrorMessage(formErrors.endereco)}
                className="field"
                sx={{ width: "500px" }}
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
                label="Número"
                variant="outlined"
                error={!!formErrors.numeroEndereco}
                helperText={handleErrorMessage(formErrors.numeroEndereco)}
                className="field"
                sx={{ width: "50px" }}
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
              />
            )}
          />
          <Controller
            name="setor"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                label="Setor"
                variant="outlined"
                error={!!formErrors.setor}
                helperText={handleErrorMessage(formErrors.setor)}
                className="field"
              />
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
              />
            )}
          />
          <Controller
            name="inicioDoacao"
            control={control}
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocale}>
                <DatePicker
                  label="Início da doação"
                  value={value}
                  onChange={(ndate) => onChange(ndate)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!formErrors.inicioDoacao}
                      helperText={handleErrorMessage(formErrors.inicioDoacao)}
                      className="field"
                      sx={{ width: "200px" }}
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
                label="Observações"
                variant="outlined"
                error={!!formErrors.observacoes}
                helperText={handleErrorMessage(formErrors.observacoes)}
                className="field"
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
                label="Inativar doador"
                sx={{ paddingBottom: "10px" }}
              />
            )}
          />
        </Styled.FormFields>
        <Styled.FormActions>
          <SubmitButton text="Confirmar" />
          {!showConfirmDelete && currentDonor
            && (
            <Styled.DeleteButton variant="outlined" onClick={() => setShowConfirmDelete(true)}>
              Excluir
            </Styled.DeleteButton>
            )}
          {showConfirmDelete && (
            <Styled.DeleteButton variant="outlined" onClick={handleClickDeleteButton}>
              Efetivar exclusão
            </Styled.DeleteButton>
          )}
        </Styled.FormActions>
      </Styled.Form>
    </Styled.Container>
  );
};

DonorForm.defaultProps = {
  currentDonor: null
};

export default DonorForm;
