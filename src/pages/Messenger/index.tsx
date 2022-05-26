import React from "react";

import PageContent from "../../molecules/PageContent";

const menus = [
  {
    id: "messengerReceipts",
    name: "Recebimento",
    link: "messengerReceipts"
  },
  {
    id: "messengerReport",
    name: "Relatório",
    link: "messengerReport"
  },
  {
    id: "messengerIntinerary",
    name: "Itinerário",
    link: "messengerIntinerary"
  }
];

const Messenger: React.FC = () => <PageContent title="Mensageiro" menus={menus} />;

export default Messenger;
