import React from "react";
import { Outlet } from "react-router-dom";

import NavbarMobile from "../../molecules/NavbarMobile";

import { OfficeMobileContainer, OfficeMobileContentArea, OfficeMobileContentContainer } from "./styles";

const OfficeMobile: React.FC = () => (
  <OfficeMobileContainer>
    <NavbarMobile />
    <OfficeMobileContentArea>
      <OfficeMobileContentContainer>
        <Outlet />
      </OfficeMobileContentContainer>
    </OfficeMobileContentArea>
  </OfficeMobileContainer>
);

export default OfficeMobile;
