import styled from "styled-components";
import { windowWidth } from "../../styles/global";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  position: absolute;

  > * {
    @media ( max-width: ${windowWidth.mobile.large} ) {
      ::-webkit-scrollbar {
        width: 2px;
      }
    }
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

export const TableContainer = styled.table`
  width: 100%;
  height: 100%;
  overflow: auto;

  th {
    text-align: left;
  }
  
  td {
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: solid 0.5px lightgray;
  }
`;
