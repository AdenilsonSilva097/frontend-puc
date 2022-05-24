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
  dataEmissao: Date | null;
}

interface IProps {
  identification: string;
  doador: string;
  endereco: string;
  bairro: string;
  valor: number;
  idDoador: string;
  numeroEndereco: string;
  onSave: () => void;
}

const schema = Yup.object().shape({
  valor: Yup.number().required(),
  dataEmissao: Yup.date().required().nullable()
});

const FormGenerateReceipt: React.FC<IProps> = ({
  bairro, doador, endereco, identification, valor, idDoador, onSave, numeroEndereco
}) => {

  const {
    control, setValue, getValues, handleSubmit, formState: { errors: formErrors }, reset
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onBlur"
  });

  const handleSubmitForm: SubmitHandler<IFormInputs> = async (formData: IFormInputs) => {
    try {
      const response = await api.get("/sector-addresses");

      const sectorId = response.data.find(
        (sectorAddress: any) => sectorAddress.bairro === bairro
      && sectorAddress.logradouro === endereco
      && Number(numeroEndereco) >= Number(sectorAddress.numeroEnderecoDe)
      && Number(numeroEndereco) <= Number(sectorAddress.numeroEnderecoAte)
      ).setor;

      const collaborators = await api.get("/collaborators");

      const collaboratorId = collaborators.data.find(
        (collaborator: any) => collaborator.setor === sectorId
      );

      const newReceipt = {
        idDoador,
        valor,
        dataEmissao: formData.dataEmissao,
        idMensageiro: collaboratorId ? collaboratorId.id : "",
        status: "EMITIDA"
      };

      await api.post("/receipts", newReceipt);

      onSave();

    } catch (error) {
      console.log(error);

    }
  };

  return (
    <Styled.Container>
      <Styled.Infos>
        {/* <Styled.Identification>{identification}</Styled.Identification> */}
        <Styled.Info>
          <Styled.Title>Doador</Styled.Title>
          <Styled.Description>{doador}</Styled.Description>
        </Styled.Info>
        <Styled.Address>
          <Styled.Info>
            <Styled.Title>Endereço</Styled.Title>
            <Styled.Description>{`${endereco}, ${numeroEndereco}`}</Styled.Description>
          </Styled.Info>
          <Styled.Info>
            <Styled.Title>Bairro</Styled.Title>
            <Styled.Description>{bairro}</Styled.Description>
          </Styled.Info>
        </Styled.Address>
        <Styled.Info>
          <Styled.Title>Valor</Styled.Title>
          <Styled.Description>{`R$${valor}`}</Styled.Description>
        </Styled.Info>
      </Styled.Infos>
      <Styled.Line />
      <Styled.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Controller
          name="dataEmissao"
          control={control}
          defaultValue={new Date()}
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocale}>
              <DatePicker
                value={value}
                label="Data emissão"
                onChange={(newDate) => onChange(newDate)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!formErrors.dataEmissao}
                    helperText={handleErrorMessage(formErrors.dataEmissao)}
                    sx={{ width: "140px" }}
                    size="small"
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="valor"
          control={control}
          defaultValue={valor}
          render={({ field }) => (
            <TextField
              {...field}
              autoComplete="off"
              label="Valor"
              variant="outlined"
              error={!!formErrors.valor}
              helperText={handleErrorMessage(formErrors.valor)}
              size="small"
              InputProps={{
                inputComponent: NumberFormatCustom as any
              }}
              sx={{ width: "140px" }}
            />
          )}
        />
        <SubmitButton text="Emitir" />
      </Styled.Form>
    </Styled.Container>
  );
};

export default FormGenerateReceipt;
