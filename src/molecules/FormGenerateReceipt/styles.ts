import styled from "styled-components";

import { windowWidth } from "../../styles/global";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.backgroundContent};
  box-shadow: 2px 2px 4px -1px ${(props) => props.theme.colors.label};

  @media (max-width: ${windowWidth.mobile.large}) {
    flex-direction: column;
    gap: 10px;
  }

`;

const Identification = styled.div`
  padding: 5px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  font-size: 11px;
  font-weight: bold;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  padding-right: 10px;

  @media (max-width: ${windowWidth.mobile.large}) {
    padding-right: 0px;
  }

`;

const Info = styled.div``;

const Title = styled.div`
  color: ${(props) => props.theme.colors.label};
  font-size: 11px;
  line-height: 5px;
`;

const Description = styled.div`
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
  font-weight: 450;
`;

const Address = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  gap: 10px;
  flex-grow: 1;

  > * {
    input, label {
      font-size: 14px !important;
    }
  }

  > :last-child {
    background-color: rgb(66, 186, 150) !important;
  }

  @media (max-width: ${windowWidth.mobile.large}) {
    flex-direction: row-reverse;
    flex-wrap: wrap;
    width: 100%;
    padding-left: 0;
    row-gap: 5px;
    justify-content: space-between;
  }

`;

const Line = styled.div`
  border-right: 1px dotted black;
  width: 1px;
  height: 100%;
`;

export {
  Container, Identification, Infos, Info, Title, Description, Address, Form, Line
};
