import React from "react";

import * as _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { AxiosResponse } from "axios";
import SubmitButton from "../../atoms/SubmitButton";

import Yup from "../../libraries/yup";

import {
  TextField, Autocomplete, CircularProgress
} from "../../libraries/mui/components";

import { handleErrorMessage } from "../../helpers/utils";

import api from "../../services/api";

import * as Styled from "./styles";

interface IFormInputs {
  nome: string;
  endereco: any;
  numeroEnderecoDe: string;
  numeroEnderecoAte: string;
}

interface ISectorAddress {
  bairro: string;
  logradouro: string;
}

const schema = Yup.object().shape({
  nome: Yup.string().required(),
  endereco: Yup.object().required(),
  numeroEnderecoDe: Yup.string().required(),
  numeroEnderecoAte: Yup.string().required()
});

interface SectorFormProps {
  currentSector?: any;
  onSave: () => void;
  onDelete: () => void;
}

const SectorForm: React.FC<SectorFormProps> = (
  { onDelete, onSave, currentSector: currentSectorProp }
) => {

  const [currentSector, setCurrentSector] = React.useState<any>(currentSectorProp);
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [showConfirmDeleteRegisteredAddress,
    setShowConfirmDeleteRegisteredAddress] = React.useState(false);

  const [currentRegisteredAddress, setCurrentRegisteredAddress] = React.useState<any>(null);
  const [currenSectorAddresses, setCurrentSectorAddresses] = React.useState<any[]>([]);
  const [openAddressAutocomplete, setOpenAddressAutocomplete] = React.useState(false);
  const [optionsAddressAutocomplete,
    setOptionsAddressAutocomplete] = React.useState<ISectorAddress[]>([]);
  const loadingAddressAutocomplete = openAddressAutocomplete
    && optionsAddressAutocomplete.length === 0;

  const {
    control, getValues, setValue, setFocus,
    resetField, handleSubmit, formState: { errors: formErrors }, reset
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onBlur"
  });

  const handleSubmitForm: SubmitHandler<IFormInputs> = async (formData: IFormInputs) => {
    try {
      const newSector = { ...formData };

      let sectorId = null;

      if (currentSector) {
        await api.patch(`/sectors/${currentSector.id}`, { nome: newSector.nome });

        sectorId = currentSector.id;

      } else {
        const response = await api.post("/sectors", { nome: newSector.nome });

        setCurrentSector(response.data);

        sectorId = response.data.id;
      }

      let sectorAddressResponse:AxiosResponse<any, any>;

      if (!currentRegisteredAddress) {
        sectorAddressResponse = await api.post("/sector-addresses", {
          setor: sectorId,
          bairro: newSector.endereco.bairro,
          logradouro: newSector.endereco.logradouro,
          numeroEnderecoDe: newSector.numeroEnderecoDe,
          numeroEnderecoAte: newSector.numeroEnderecoAte
        });
      } else {
        sectorAddressResponse = await api.patch(`/sector-addresses/${currentRegisteredAddress.id}`, {
          bairro: newSector.endereco.bairro,
          logradouro: newSector.endereco.logradouro,
          numeroEnderecoDe: newSector.numeroEnderecoDe,
          numeroEnderecoAte: newSector.numeroEnderecoAte
        });
      }

      const updatedCurrentSectorAddresses = [...currenSectorAddresses];

      const updatedCurrentRegisteredAddressIndex = updatedCurrentSectorAddresses.findIndex(
        (address) => address.id === sectorAddressResponse.data.id
      );

      const currentRegisteredAddressAlreadyExists = updatedCurrentRegisteredAddressIndex !== -1;

      if (currentRegisteredAddressAlreadyExists) {
        updatedCurrentSectorAddresses[updatedCurrentRegisteredAddressIndex] = {
          id: sectorAddressResponse.data.id,
          bairro: newSector.endereco.bairro,
          logradouro: newSector.endereco.logradouro,
          numeroDe: newSector.numeroEnderecoDe,
          numeroAte: newSector.numeroEnderecoAte
        };
      } else {
        updatedCurrentSectorAddresses.push({
          id: sectorAddressResponse.data.id,
          bairro: newSector.endereco.bairro,
          logradouro: newSector.endereco.logradouro,
          numeroDe: newSector.numeroEnderecoDe,
          numeroAte: newSector.numeroEnderecoAte
        });
      }

      setCurrentSectorAddresses(updatedCurrentSectorAddresses);

      resetField("endereco");
      resetField("numeroEnderecoDe");
      resetField("numeroEnderecoAte");

      const updatedOptionsAddressAutocomplete = optionsAddressAutocomplete.filter(
        (address) => address.bairro !== newSector.endereco.bairro
          && address.logradouro !== newSector.endereco.logradouro
      );

      setOptionsAddressAutocomplete(updatedOptionsAddressAutocomplete);

    } catch (error) {
      console.log(error);

    }
  };

  const handleClickFinishButton = async () => {

    const sectorName = getValues("nome");

    if (!sectorName) {
      setFocus("nome");

      return;
    }

    if (currentSector) {
      await api.patch(`/sectors/${currentSector.id}`, { nome: sectorName });
    } else {
      await api.post("/sectors", { nome: sectorName });
    }

    reset();
    onSave();
  };

  const handleClickDeleteButton = async () => {
    try {
      await api.delete(`/sectors/${currentSector.id}`);

      const sectorAddresses = await api.get(`/sector-addresses/sector/${currentSector.id}`);

      await Promise.all(
        sectorAddresses.data.map(async (sectorAddress: any) => {
          await api.delete(`/sector-addresses/${sectorAddress.id}`);
        })
      );

      setShowConfirmDelete(false);
      onDelete();
    } catch (error) {

      console.log(error);
    }
  };

  const handleClickDeleteRegisteredAddressButton = async () => {
    try {
      await api.delete(`/sector-addresses/${currentRegisteredAddress.id}`);

      const updatedCurrenSectorAddresses = currenSectorAddresses.filter(
        (sectorAddress: any) => sectorAddress.id !== currentRegisteredAddress.id
      );

      setCurrentSectorAddresses(updatedCurrenSectorAddresses);

      resetField("endereco");
      resetField("numeroEnderecoDe");
      resetField("numeroEnderecoAte");

      setShowConfirmDeleteRegisteredAddress(false);
    } catch (error) {

      console.log(error);
    }
  };

  const handleRegisteredAddressClick = (address: any) => {
    setValue("endereco", address);
    setValue("numeroEnderecoDe", address.numeroDe);
    setValue("numeroEnderecoAte", address.numeroAte);

    setCurrentRegisteredAddress(address);
  };

  React.useEffect(() => {

    let active = true;

    if (!loadingAddressAutocomplete) {
      return undefined;
    }

    (async () => {

      try {
        const { data } = await api.get("/donors");

        const addressDonors: any = [];

        data.forEach((element : any) => {
          if (addressDonors
            .findIndex(
              (address: any) => address.bairro === element.bairro
              && address.logradouro === element.endereco
            ) === -1) {
            addressDonors.push({
              bairro: element.bairro,
              logradouro: element.endereco
            });
          }
        });

        const addressDonorsWithoutCurrentSectorAddresses = addressDonors.filter(
          (address: any) => currenSectorAddresses
            .findIndex(
              (sectorAddress: any) => sectorAddress.bairro === address.bairro
              && sectorAddress.logradouro === address.logradouro
            ) === -1
        );

        setOptionsAddressAutocomplete(addressDonorsWithoutCurrentSectorAddresses);

      } catch (error) {
        setOpenAddressAutocomplete(false);
        console.log(error);
      }

    })();

    return () => { active = false; };

  }, [loadingAddressAutocomplete]);
  React.useEffect(() => { // To load each time the concrete batching plant field is focused
    if (!openAddressAutocomplete) setOptionsAddressAutocomplete([]);
  }, [openAddressAutocomplete]);

  React.useEffect(() => {

    (async () => {
      if (currentSector) {

        setValue("nome", currentSector.nome);

        const sectorAddressResponse = await api.get(`/sector-addresses/sector/${currentSector.id}`);

        const currentSectorAddresses = sectorAddressResponse.data.map((sectorAddress: any) => ({
          id: sectorAddress.id,
          bairro: sectorAddress.bairro,
          logradouro: sectorAddress.logradouro,
          numeroDe: sectorAddress.numeroEnderecoDe,
          numeroAte: sectorAddress.numeroEnderecoAte
        }));

        setCurrentSectorAddresses(currentSectorAddresses);

      }
    })();
  }, [currentSector]);

  return (
    <Styled.Container>
      <Styled.FormContainer>
        <Styled.Form onSubmit={handleSubmit(handleSubmitForm)}>
          <Styled.FormFields>
            <Controller
              name="nome"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoComplete="off"
                  autoFocus
                  label="Nome do setor"
                  variant="outlined"
                  error={!!formErrors.nome}
                  helperText={handleErrorMessage(formErrors.nome)}
                  className="field"
                  sx={{ width: "400px" }}
                  size="small"
                />
              )}
            />
            <Styled.AddressFields>
              <Controller
                name="endereco"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    onChange={(_ev, item) => field.onChange(item)}
                    onOpen={() => setOpenAddressAutocomplete(true)}
                    onClose={() => setOpenAddressAutocomplete(false)}
                    isOptionEqualToValue={(option, valueOption) => option.id === valueOption.id}
                    getOptionLabel={(option) => `${option.logradouro} - ${option.bairro}`}
                    open={openAddressAutocomplete}
                    options={optionsAddressAutocomplete}
                    loading={loadingAddressAutocomplete}
                    loadingText="Carregando..."
                    noOptionsText="Sem opções"
                    autoHighlight
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Endereço"
                        error={!!formErrors.endereco}
                        variant="outlined"
                        size="small"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loadingAddressAutocomplete && <CircularProgress color="inherit" size={20} />}
                              {params.InputProps.endAdornment}
                            </>
                          )
                        }}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="numeroEnderecoDe"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="off"
                    label="Número de"
                    type="number"
                    variant="outlined"
                    error={!!formErrors.numeroEnderecoDe}
                    sx={{ width: "120px" }}
                    size="small"
                    InputProps={{
                      inputProps: {
                        min: 0
                      }
                    }}
                  />
                )}
              />
              <div> - </div>
              <Controller
                name="numeroEnderecoAte"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="off"
                    label="Número até"
                    type="number"
                    variant="outlined"
                    error={!!formErrors.numeroEnderecoAte}
                    sx={{ width: "120px" }}
                    size="small"
                    InputProps={{
                      inputProps: {
                        min: 0
                      }
                    }}
                  />
                )}
              />
            </Styled.AddressFields>
          </Styled.FormFields>
          <Styled.FormActions>
            {!showConfirmDeleteRegisteredAddress && currentRegisteredAddress
                && (
                <Styled.DeleteButton variant="outlined" onClick={() => setShowConfirmDeleteRegisteredAddress(true)}>
                  Excluir
                </Styled.DeleteButton>
                )}
            {showConfirmDeleteRegisteredAddress && (
              <Styled.DeleteButton variant="outlined" onClick={handleClickDeleteRegisteredAddressButton}>
                Efetivar exclusão
              </Styled.DeleteButton>
            )}
            <SubmitButton text="Adicionar" />
          </Styled.FormActions>
        </Styled.Form>
        <Styled.RegisteredAddresses>
          {currenSectorAddresses.map((address: any) => (
            <Styled.RegisteredAddress
              key={address.logradouro}
              onClick={() => handleRegisteredAddressClick(address)}
            >
              {`${address.logradouro} - ${address.bairro} | Nº ${address.numeroDe} até Nº ${address.numeroAte}`}
            </Styled.RegisteredAddress>
          ))}
        </Styled.RegisteredAddresses>
      </Styled.FormContainer>
      <Styled.FormActions>
        <Styled.FinishButton onClick={handleClickFinishButton}>
          Finalizar
        </Styled.FinishButton>
        {!showConfirmDelete && currentSector
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
    </Styled.Container>
  );

};

SectorForm.defaultProps = {
  currentSector: null
};

export default SectorForm;
