import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  TextField, FormControl, InputLabel, Select, MenuItem,
  FormHelperText, FormControlLabel, Checkbox
} from "../../libraries/mui/components";

import Yup from "../../libraries/yup";

import SubmitButton from "../../atoms/SubmitButton";

import { handleErrorMessage } from "../../helpers/utils";

import api from "../../services/api";

import * as Styled from "./styles";
import FormDialog from "../FormDialog";
import FormGenerateReceipt from "../FormGenerateReceipt";

interface IFormInputs {
  frequencia: string;
  melhorData: number;
  nome: string;
  telefone: string;
  cidade: string;
  setor: string;
  cpf: string;
}

const schema = Yup.object().shape({
  frequencia: Yup.string().required(),
  melhorData: Yup.number().min(0).max(31),
  nome: Yup.string(),
  telefone: Yup.string(),
  cidade: Yup.string(),
  setor: Yup.string(),
  cpf: Yup.string()
});

const FormFilterToGenerateReceipts: React.FC = () => {

  const [donors, setDonors] = React.useState<any[]>([]);
  const [filteredDonors, setFilteredDonors] = React.useState<any[]>([]);
  const [sectors, setSectors] = React.useState<any[]>([]);
  const [cities, setCities] = React.useState<any[]>([]);
  const [openReceipts, setOpenReceipts] = React.useState<boolean>(false);
  const [messengerId, setMessengerId] = React.useState<string>("");

  const {
    control, setValue, getValues, handleSubmit, formState: { errors: formErrors }, reset
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onBlur"
  });

  const handleFrequencyChange = (newValue: string) => {
    setValue("frequencia", newValue);
  };

  const handleSectorChange = async (newValue: string) => {
    setValue("setor", newValue);
  };

  const handleCityChange = (newValue: string) => {
    setValue("cidade", newValue);
  };

  const handleSubmitForm: SubmitHandler<IFormInputs> = async (formData: IFormInputs) => {
    try {
      const { data: donorsData } = await api.get("/donors");
      let sectorAddresses = [] as any[];

      setDonors(donorsData);

      const activeDonors = donorsData.filter((donor: any) => donor.inativo === false);

      if (formData.setor !== "") {
        const response = await api.get(`/sector-addresses/sector/${formData.setor}`);

        sectorAddresses = response.data;
      }

      // filter donors by form data
      const donorsFilteredData = activeDonors.filter(
        (donor: any) => donor.frequencia === formData.frequencia
        && (formData.melhorData > 0 ? donor.melhorData === formData.melhorData : true)
        && (formData.nome !== "" ? donor.nome.toUpperCase() === formData.nome.toUpperCase() : true)
        && (formData.telefone !== "" ? donor.telefone === formData.telefone : true)
        && (formData.cidade !== "" ? donor.cidade === formData.cidade : true)
        && (formData.cpf !== "" ? donor.cpf === formData.cpf : true)
        && (formData.setor !== ""
          ? sectorAddresses.findIndex(
            (sectorAddress) => sectorAddress.bairro === donor.bairro
            && sectorAddress.logradouro === donor.endereco
            && Number(donor.numeroEndereco) >= Number(sectorAddress.numeroEnderecoDe)
            && Number(donor.numeroEndereco) <= Number(sectorAddress.numeroEnderecoAte)
          ) !== -1 : true)
      );

      setFilteredDonors(donorsFilteredData);
      setOpenReceipts(true);

    } catch (error) {
      console.log(error);

    }
  };

  React.useEffect(() => {
    (async () => {
      const { data: sectorsData } = await api.get("/sectors");
      const { data: donorsData } = await api.get("/donors");

      const registeredCities: string = donorsData.map((donor: any) => donor.cidade);

      const citiesData = Array.from(new Set(registeredCities));

      setSectors(sectorsData);
      setCities(citiesData);
    })();

    return () => {
      setSectors([]);
      setCities([]);
    };
  }, []);

  const handleSaveReceipt = (donorId: string) => {
    const updatedFilteredDonors = filteredDonors.filter((donor: any) => donor.id !== donorId);

    setFilteredDonors(updatedFilteredDonors);
  };

  return (
    <Styled.Container>
      <Styled.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Styled.FormFields>
          <Controller
            name="frequencia"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl size="small" error={!!formErrors.frequencia} className="field" sx={{ width: "100px" }}>
                <InputLabel id="frequency-select">Frequência</InputLabel>
                <Select
                  {...field}
                  labelId="frequency-select"
                  label="Frequência"
                  error={!!formErrors.frequencia}
                  size="small"
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
                onBlur={() => (getValues("melhorData").toString() === "" ? setValue("melhorData", 1) : null)}
                sx={{ width: "100px" }}
                size="small"
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
            name="cidade"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl size="small" error={!!formErrors.cidade} className="field" sx={{ width: "200px" }}>
                <InputLabel id="sector-select">Cidade</InputLabel>
                <Select
                  {...field}
                  labelId="city-select"
                  label="Cidade"
                  error={!!formErrors.cidade}
                  onChange={(e) => handleCityChange(e.target.value)}
                  size="small"
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
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
                  <MenuItem value="">Nenhum setor</MenuItem>
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
        </Styled.FormFields>
        <Styled.FormActions>
          <SubmitButton text="Confirmar" />
        </Styled.FormActions>
      </Styled.Form>
      <FormDialog
        title="Recibos a serem emitidos"
        open={openReceipts}
        onClose={() => setOpenReceipts(false)}
      >
        <Styled.Receipts>
          {filteredDonors.map((donor, index) => (
            <FormGenerateReceipt
              key={donor.id}
              bairro={donor.bairro}
              doador={donor.nome}
              endereco={donor.endereco}
              numeroEndereco={donor.numeroEndereco}
              identification={(index + 1).toString()}
              valor={donor.valor}
              idDoador={donor.id}
              onSave={() => handleSaveReceipt(donor.id)}
            />
          ))}
        </Styled.Receipts>
      </FormDialog>
    </Styled.Container>
  );
};

export default FormFilterToGenerateReceipts;
