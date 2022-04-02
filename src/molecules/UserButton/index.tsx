import React from "react";

import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";

import edit from "../../assets/edit.svg";
import Person from "../../assets/person.svg";
import userLogout from "../../assets/userLogout.svg";
import permissions from "../../assets/permissions.svg";

import UserMenuItem from "../../atoms/UserMenuItem";
import UserMenu from "../UserMenu";

import { Modal } from "../../libraries/mui/components";

import api from "../../services/api";

import * as Styled from "./styles";

const UserButton: React.FC = () => {

  const loggedUser = JSON.parse(localStorage.getItem("@user")!);

  const [userIsAdmin, setUserIsAdmin] = React.useState(false);
  const navigate = useNavigate();
  const [openUserMenu, setOpenUserMenu] = React.useState(false);

  React.useEffect(() => {
    const getPermissionGroupName = async () => {
      const { data } = await api.get(`/permission-groups/${loggedUser.permissionGroup}`);

      return data.name;
    };

    getPermissionGroupName().then((value: string) => {
      setUserIsAdmin(value.toUpperCase() === "ADMIN");
    });
  }, []);

  const handleUserButtonClick = () => {
    setOpenUserMenu(true);
  };

  const onCloseUserButtonClick = () => {
    setOpenUserMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("@user");
    setOpenUserMenu(false);
    navigate("/");
  };

  const handlePermissions = () => {
    setOpenUserMenu(false);
    navigate("permissions");
  };

  return (
    <>
      <Styled.Container onClick={handleUserButtonClick}>
        <ReactSVG src={Person} />
      </Styled.Container>
      <Modal
        open={openUserMenu}
        onClose={onCloseUserButtonClick}
        disableEnforceFocus
        disableAutoFocus
      >
        <div>
          <UserMenu>
            {/* <UserMenuItem iconPath={edit} title="Editar" /> */}
            {userIsAdmin
              && <UserMenuItem iconPath={permissions} title="Permissões de usuário" onClick={handlePermissions} />}
            <UserMenuItem iconPath={userLogout} title="Sair" onClick={handleLogout} />
          </UserMenu>
        </div>
      </Modal>
    </>
  );
};

export default UserButton;
