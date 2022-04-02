import React from "react";

import PageContent from "../../molecules/PageContent";

const menus = [
  {
    id: "newIssue",
    name: "Novos",
    link: "newIssue"
  },
  {
    id: "issued",
    name: "Emitidos",
    link: "issued"
  }
];

const Issue: React.FC = () => <PageContent title="Emissão" menus={menus} />;

export default Issue;
