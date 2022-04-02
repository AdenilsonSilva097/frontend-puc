import React from "react";

import * as Styled from "./styles";

interface UserMenuItemProps extends React.DOMAttributes<HTMLDivElement>{
  iconPath: string;
  title: string;
}

const UserMenuItem: React.FC<UserMenuItemProps> = ({ iconPath, title, ...rest }) => (
  <Styled.Container {...rest}>
    <img src={iconPath} alt="icon" />
    <span>{title}</span>
  </Styled.Container>
);

export default UserMenuItem;
