import styled from "styled-components";
import { windowWidth } from "../../styles/global";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.backgroundContent};
  box-shadow: 2px 2px 4px -1px ${(props) => props.theme.colors.label};
`;

const Identification = styled.div`
  padding: 5px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  font-size: 9px;
  font-weight: bold;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
  width: 100%;
  padding-right: 10px;

  @media (max-width: ${windowWidth.mobile.large}) {
    padding-right: 0px;
  }

`;

const Info = styled.div`
  width: 100%;
`;

const Title = styled.div`
  color: ${(props) => props.theme.colors.label};
  font-size: 11px;
  line-height: 5px;
`;

const Description = styled.div`
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
  font-weight: 450;

  @media (max-width: ${windowWidth.mobile.large}) {
    font-size: 16px;
  }

`;

const Address = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 25px;
  width: 100%;

  > * {
    border-bottom: none;
  }

`;

export {
  Container, Identification, Infos, Info, Title, Description, Address
};
