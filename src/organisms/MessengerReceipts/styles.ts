import styled from "styled-components";

import { windowWidth } from "../../styles/global";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  height: 100%;
  padding: 15px;
`;

export const Receipts = styled.div`
  flex-grow: 1;
  min-width: 380px;
  
  @media (max-width: ${windowWidth.mobile.large}) {
    width: 100%;
    min-width: 100%;
  }
  
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  max-width: 380px;

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    border: none;
    padding: 5px;
    border-radius: 10px;
    width: 100%;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5);
    color: white;
    font-weight: 450;
    cursor: pointer;

    @media (max-width: ${windowWidth.mobile.large}) {
      padding: 10px;
    }

  }
`;

export const ArrowButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 5px;

  button {
    padding: 10px;
    border-radius: 50%;
    outline: none;
    border: none;
    background-color: ${({ theme }) => theme.colors.primary};
    height: 40px;
    width: 40px;
    font-weight: bold;
    color: white;
    font-size: 20px;
    line-height: 20px;
    text-align: center;

    :disabled {
      background-color: lightgray;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 25px;

  > * {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 50%;
    outline: none;
    border: none;
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5);
    height: 50px;
    width: 50px;
    font-weight: bold;
    color: white;
    cursor: pointer;

    @media (max-width: ${windowWidth.mobile.large}) {
      height: 75px;
      width: 75px;
    }

  }

  > :first-child {
    background-color: white;
    color: red;
  }
`;
