import styled from "styled-components";

import { windowWidth } from "../../styles/global";
import { Button } from "../../libraries/mui/components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  padding-top: 15px;
  padding-bottom: 15px;
  gap: 15px;

  > :first-child {
    padding-bottom: 15px;
  }
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;

  > :last-child {
    margin-top: 10px;
    align-self: flex-end;
  }
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  flex-wrap: wrap;
  max-width: 900px;
  

  > * {
    flex-grow: 1;
    flex-basis: 1;
    width: 100%;
  }

  @media (max-width: ${windowWidth.mobile.large}) {
    width: 100%;
    align-items: flex-start;
    flex-direction: column;

    > * {
      width: 100% !important;
    }
  }

`;

const FormActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const DeleteButton = styled(Button)`
  color: red !important;
  border-color: red !important;
  border-radius: 20px !important;
  min-width: 150px !important;
  min-height: 40px !important;
`;

const FinishButton = styled(Button)`
  color: ${(props) => props.theme.colors.primary} !important;
  border-color: ${(props) => props.theme.colors.primary} !important;
  border-radius: 20px !important;
  min-width: 150px !important;
  min-height: 40px !important;
`;

const AddressFields = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;

  > :first-child {
    min-width: 275px;
  }
`;

const RegisteredAddresses = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
  width: 100%;
  padding: 10px;
  overflow: auto;
`;

const RegisteredAddress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  border: 1px solid #ccc;
  box-shadow: 0px 1px 2px 0px #ccc;
  border-radius: 10px;
  width: 100%;
  padding: 15px;
  cursor: pointer;
  user-select: none;

  :hover {
    box-shadow: 0px 1px 2px 1px #ccc;
  }
`;

export {
  Container, Form, FormFields, DeleteButton, FinishButton,
  FormActions, AddressFields, RegisteredAddresses, RegisteredAddress
};
