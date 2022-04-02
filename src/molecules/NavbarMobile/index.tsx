import React, { useState } from "react";

import MenuButton from "../../atoms/MenuButton";
import EmpatieseLogotipo from "../../atoms/EmpatieseLogotipo";

import SidebarMobile from "../SidebarMobile";

import { NavbarMobileContainer } from "./styles";
import UserButton from "../UserButton";

const NavbarMobile: React.FC = () => {

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleClick = () => {
    setOpenSidebar((state) => !state);
  };

  return (
    <NavbarMobileContainer>
      <UserButton />
      <EmpatieseLogotipo color="secondary" />
      {openSidebar
        ? <SidebarMobile onClose={handleClick} /> : null}
      <MenuButton onClick={handleClick} />
    </NavbarMobileContainer>
  );
};

export default NavbarMobile;
