import React from "react";

import { MenuButtonContainer } from "./styles";

interface MenuButtonProps {
  onClick: () => void
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => (
  <MenuButtonContainer onClick={onClick}>
    <div />
    <div />
    <div />
  </MenuButtonContainer>
);

export default MenuButton;
