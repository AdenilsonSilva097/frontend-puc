import React from "react";

import * as Styled from "./styles";

const UserMenu: React.FC = ({ children }) => {

  const loggedUser = JSON.parse(localStorage.getItem("@user")!);

  return (
    <Styled.Container>
      <Styled.UserInfo>
        <span>{loggedUser.name}</span>
        <span>{loggedUser.email}</span>
      </Styled.UserInfo>
      {children}
    </Styled.Container>
  );
};

export default UserMenu;
