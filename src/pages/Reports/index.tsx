import React from "react";

import PageContent from "../../molecules/PageContent";

const menus = [
  {
    id: "receiptsReport",
    name: "Guias por status",
    link: "receiptsReport"
  },
  {
    id: "donorsPerMostFavorableDate",
    name: "Doadores por melhor data",
    link: "donorsPerMostFavorableDate"
  },
  {
    id: "collaboratorsPerPosition",
    name: "Colaboradores por cargo",
    link: "collaboratorsPerPosition"
  }
];

const Reports: React.FC = () => <PageContent title="Relatórios" menus={menus} />;

export default Reports;
