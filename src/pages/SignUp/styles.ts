import styled from "styled-components";

import { windowWidth } from "../../styles/global";

const SignUpContainer = styled.div`
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

const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  padding-left: 90px;
  padding-right: 75px;
  padding-bottom: 5px;
  flex-grow: 1;
  overflow: hidden;

  >:first-child {
    align-self: flex-start;
    font-weight: 900;
    font-size: 35px;
    color: ${(props) => props.theme.colors.textBold};
    width: 94%;
    margin-left: 30px;
    line-height: 40px;
    padding-bottom: 10px;
    box-shadow: 0px 6px 15px 3px white;
    z-index: 10;

    @media (max-width: ${windowWidth.laptop.large}) {
      font-size: 33px;
      line-height: 38px;
      margin-left: 10px;
    }
  }

  @media (max-width: ${windowWidth.tablet}) {
    border-radius: 25px;
    background-color: ${(props) => props.theme.colors.background};
    width: 90%;
    padding: 30px 10px 0px 10px;
    order: 2;
    position: fixed;
    top: 80px;
    height: 80%;
  }
`;

const SignUpBannerContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10vh 0px 0px 0px;
  width: 50%;

  > :first-child {
    color: white;
  }

  > :last-child {
    width: 50%;
  }

  @media (max-width: ${windowWidth.tablet}) {
    justify-content: flex-start;
    width: 100%;
    height: 234px;
    min-height: 234px;
    padding-top: 20px;
    border-radius: 0px 0vh 30px 0px;

    > :first-child {
      display: none;
    }

    > :last-child {
      width: 30%;
    }

  }

`;

const SignUpFormContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: auto;
  padding: 20px 45px 30px 30px;

  @media (max-width: ${windowWidth.laptop.large}) {
    padding: 10px 25px 20px 10px;
  } 

  >form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    >button {
      width: 40%;
      height: 40px;
      font-size: 20px;
      margin-top: 20px;

      @media (max-width: ${windowWidth.laptop.medium}) {
        width: 70%;
      }
    }
  }
`;

const SignUpLoginContainer = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.colors.textBold};
  padding: 40px 20px 0px 20px;

  @media (max-width: ${windowWidth.tablet}) {
    font-size: 17px;
  }

`;

export {
  SignUpContainer,
  SignUpBannerContainer,
  SignUpFormContainer,
  SignUpLoginContainer,
  SignUpFormContent
};
