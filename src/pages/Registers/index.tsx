import React from "react";

import PageContent from "../../molecules/PageContent";

const menus = [
  {
    id: "donor",
    name: "Doador",
    link: "donor"
  },
  {
    id: "collaborator",
    name: "Colaborador",
    link: "collaborator"
  },
  {
    id: "sector",
    name: "Setor",
    link: "sector"
  }
];

const Registers: React.FC = () => <PageContent title="Cadastros" menus={menus} />;

export default Registers;
