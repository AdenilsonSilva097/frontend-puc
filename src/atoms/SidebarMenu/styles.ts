import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SidebarMenuContainer = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 0px 50px 50px 0px;
  padding: 10px 30px;
  width: 242px;

  &.active {
    box-shadow: 0px 0px 0px 1px white !important;
  }

  :focus, :active, :hover {
    box-shadow: 0px 0px 0px 1px rgb(255, 255, 255, 0.6);
    outline: none;
    border: none;
    text-decoration: none;
  }
`;

const SidebarMenuIcon = styled.img`
  width: 22px;
`;

const SidebarMenuTitle = styled.span`
  padding-left: 15px;
  padding-right: 10px;
  color: white;
  user-select: none;
  font-size: 23px;
  font-weight: 400;
`;

export { SidebarMenuContainer, SidebarMenuIcon, SidebarMenuTitle };
