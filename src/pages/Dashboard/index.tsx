import React from "react";
import isMobile from "../../helpers/IsMobile";

import { DashboardContainer, DashboardTitle, DashboardContent } from "./styles";

const Dashboard: React.FC = () => (
  <DashboardContainer>
    <DashboardTitle>Boas-vindas</DashboardTitle>
    <DashboardContent>
      {isMobile()
        ? "Use o menu no canto superior esquerdo para acessar as opções."
        : "Use o menu lateral para navegar entre as aplicações"}
    </DashboardContent>
  </DashboardContainer>
);

export default Dashboard;
