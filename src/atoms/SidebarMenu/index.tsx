import React from "react";

import { SidebarMenuContainer, SidebarMenuIcon, SidebarMenuTitle } from "./styles";

interface SidebarMenuProps {
  srcIcon: string,
  title: string,
  link: string
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ srcIcon, title, link }) => (
  <SidebarMenuContainer to={link} tabIndex={0}>
    <SidebarMenuIcon src={srcIcon} alt="ícone do menu" />
    <SidebarMenuTitle>{title}</SidebarMenuTitle>
  </SidebarMenuContainer>
);

export default SidebarMenu;
