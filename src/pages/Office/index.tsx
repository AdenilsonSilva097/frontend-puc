import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../molecules/Sidebar";
import Navbar from "../../molecules/Navbar";

import { OfficeContainer, OfficeContentArea, OfficeContentContainer } from "./styles";

const Office: React.FC = () => (
  <OfficeContainer>
    <Sidebar />
    <OfficeContentArea>
      <Navbar />
      <OfficeContentContainer>
        <Outlet />
      </OfficeContentContainer>
    </OfficeContentArea>
  </OfficeContainer>
);

export default Office;
