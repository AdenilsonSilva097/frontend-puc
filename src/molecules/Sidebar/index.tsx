import React from "react";

import DashboardIcon from "../../assets/dashboardIcon.svg";
import IssueIcon from "../../assets/issuanceIcon.svg";
import MessengerIcon from "../../assets/messengerIcon.svg";
import RegisterIcon from "../../assets/registerIcon.svg";
import ReportsIcon from "../../assets/reportsIcon.svg";

import SidebarMenu from "../../atoms/SidebarMenu";
import EmpatieseLogotipo from "../../atoms/EmpatieseLogotipo";

import { SidebarContainer, SidebarMenusContainer } from "./styles";
import api from "../../services/api";

const menus = [
  {
    title: "Início",
    icon: DashboardIcon,
    link: "dashboard"
  },
  {
    title: "Cadastros",
    icon: RegisterIcon,
    link: "registers"
  },
  {
    title: "Emissão",
    icon: IssueIcon,
    link: "issue"
  },
  {
    title: "Relatórios",
    icon: ReportsIcon,
    link: "reports"
  },
  {
    title: "Mensageiro",
    icon: MessengerIcon,
    link: "messenger"
  }
];

const Sidebar: React.FC = () => {

  const [currentApplications, setCurrentApplications] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      const { data: permissions } = await api.get("/permission-group-items");
      const { data: applicationsData } = await api.get("/applications");

      const loggedUser = JSON.parse(localStorage.getItem("@user")!);

      const userPermissions = permissions.filter(
        (value: any) => value.permissionGroup === loggedUser.permissionGroup
      );

      const applications = userPermissions.map((element: any) => applicationsData.find(
        (value: any) => value.id === element.application
      ));

      setCurrentApplications(applications);
    })();

    return () => {
      setCurrentApplications([]);
    };

  }, []);

  return (
    <SidebarContainer id="sidebar">
      <EmpatieseLogotipo color="secondary" />
      <SidebarMenusContainer>
        { currentApplications.length === 0
          && <div style={{ color: "white", paddingLeft: "10px" }}>Aguarde...</div>}

        {currentApplications.map((application: any) => {

          const app = menus.find((value: any) => value.title === application.name);

          return (
            <SidebarMenu key={app?.title} srcIcon={app!.icon} title={app!.title} link={app!.link} />
          );
        })}
      </SidebarMenusContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
