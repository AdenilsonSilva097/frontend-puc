import React from "react";
import { useNavigate } from "react-router-dom";

import edit from "../../assets/edit.svg";
import userLogout from "../../assets/userLogout.svg";
import permissions from "../../assets/permissions.svg";

import UserMenuItem from "../../atoms/UserMenuItem";

import api from "../../services/api";

import * as Styled from "./styles";

interface UserMenuProps {
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onClose }) => {

  const loggedUser = JSON.parse(localStorage.getItem("@user")!);

  const navigate = useNavigate();
  const [userIsAdmin, setUserIsAdmin] = React.useState(false);

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("@user");
    onClose();
  };

  const handlePermissions = () => {
    navigate("permissions");
    onClose();
  };

  React.useEffect(() => {
    console.log("to entrando aqui hein");
    const getPermissionGroupName = async () => {
      const { data } = await api.get(`/permission-groups/${loggedUser.permissionGroup}`);

      return data.name;
    };

    getPermissionGroupName().then((value: string) => {
      setUserIsAdmin(value.toUpperCase() === "ADMIN");
    });
  }, []);

  return (
    <Styled.Container>
      <Styled.UserInfo>
        <span>{loggedUser.name}</span>
        <span>{loggedUser.email}</span>
      </Styled.UserInfo>
      {userIsAdmin
        && <UserMenuItem iconPath={permissions} title="Permissões de usuário" onClick={handlePermissions} />}
      <UserMenuItem iconPath={userLogout} title="Sair" onClick={handleLogout} />
    </Styled.Container>
  );
};

export default UserMenu;
