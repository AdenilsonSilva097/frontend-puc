import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { windowWidth } from "../../styles/global";

const PageContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PageContentTitle = styled.div`
  font-weight: 450;
  font-size: 22px;
  padding-bottom: 15px;
  user-select: none;

  @media (max-width: ${windowWidth.tablet}) {
    color: white;
    padding-top: 5px;
    padding-bottom: 5px;
  }

`;

const PageContentMenus = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 25px;
  user-select: none;

  > * {
    padding-right: 30px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    outline: none;
    text-decoration: none;
    color: black;
    
    &:hover,
    &:focus {
      border: none;
    }

    @media (max-width: ${windowWidth.tablet}) {
      color: white;
      cursor: none;
    }
  }

  @media (max-width: ${windowWidth.tablet}) {
    padding-bottom: 15px;
  }

`;

const PageContentMenu = styled(NavLink)`
  :hover{
    transform: scale(1.02);
  }

  &.active {
    
    > :last-child {
      transition: width 0.6s;
      width: 100%;
    }

    @media print {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const PageContentMenusIdentifier = styled.div`
  width: 0%;
  height: 2.4px;
  padding-right: 0px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.colors.primary};

  @media (max-width: ${windowWidth.tablet}) {
    background-color: ${(props) => props.theme.colors.secondary};
  }

`;

const PageContentChildrens = styled.div`
  position: relative;
  background-color: white;
  flex-grow: 1;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  
  /* > * {
    padding-left: 10px;
  } */
`;

export {
  PageContentContainer,
  PageContentTitle,
  PageContentMenus,
  PageContentMenu,
  PageContentChildrens,
  PageContentMenusIdentifier
};
