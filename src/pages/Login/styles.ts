import styled from "styled-components";

import { windowWidth } from "../../styles/global";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;

  @media (max-width: ${windowWidth.tablet}) {
    flex-direction: column;
    align-items: center;
    background-color: rgb(244, 245, 248);
  }
`;

const LoginBannerContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0px 10vh 0px 0px;
  width: 50%;
  min-width: 50%;

  > :first-child {
    width: 50%;
  }

  @media (max-width: ${windowWidth.tablet}) {
    align-items: flex-start;
    width: 100%;
    height: 234px;
    min-height: 234px;
    border-radius: 0px 0vh 30px 0px;
    padding-top: 20px;

    > :first-child {
      width: 30%;
    }
  }
`;

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 60px;
  flex-grow: 1;

  @media (max-width: ${windowWidth.tablet}) {
    justify-content: space-evenly;
    border-radius: 25px;
    background-color: ${(props) => props.theme.colors.background};
    width: 90%;
    height: 80%;
    padding: 15px 5px;
    position: fixed;
    top: 80px;
    overflow: auto;
  }

  > :first-child {
    color: ${(props) => props.theme.colors.primary};
    text-align: center;
    font-style: normal;
    font-weight: 900;
    font-size: 60px;
    width: 90%;
    line-height: 90px;
    box-shadow: 0px 6px 15px 3px white;
    z-index: 10;

    @media (max-width: ${windowWidth.laptop.large}) {
      font-size: 38px;
    }
  }
`;

const LoginFormContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: auto;
  padding: 20px 45px 30px 30px;

  @media (max-width: ${windowWidth.laptop.large}) {
    padding: 10px 25px 20px 10px;
  } 

  > form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5% 20% 10% 20%;

    @media (max-width: ${windowWidth.laptop.large}) {
      padding: 5% 0% 10% 7%;
    }

    > button {
      width: 50%;
      margin-top: 30px;
      height: 40px;
      font-size: 20px;

      @media (max-width: ${windowWidth.tablet}) {
        width: 50%;
      }
    }

    .google-login-button {
      min-width: 200px;
    }
  }
`;

const LoginSignUpContainer = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.colors.textBold};

  @media (max-width: ${windowWidth.tablet}) {
    font-size: 17px;
  }
`;

export {
  LoginContainer,
  LoginBannerContainer,
  LoginFormContainer,
  LoginFormContent,
  LoginSignUpContainer
};
