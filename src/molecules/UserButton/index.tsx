import React from "react";

import { ReactSVG } from "react-svg";

import Person from "../../assets/person.svg";

import UserMenu from "../UserMenu";

import { Modal } from "../../libraries/mui/components";

import * as Styled from "./styles";

const UserButton: React.FC = () => {

  const [openUserMenu, setOpenUserMenu] = React.useState(false);

  const handleUserButtonClick = () => {
    setOpenUserMenu(true);
  };

  const onCloseUserButtonClick = () => {
    setOpenUserMenu(false);
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
          <UserMenu onClose={() => setOpenUserMenu(false)} />
        </div>
      </Modal>
    </>
  );
};

export default UserButton;
