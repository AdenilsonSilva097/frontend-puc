import React from "react";

// import SearchInput from "../SearchInput";

import { NavbarContainer } from "./styles";
import UserButton from "../UserButton";

const Navbar: React.FC = () => (
  <NavbarContainer>
    {/* <SearchInput /> */}
    <UserButton />
  </NavbarContainer>
);

export default Navbar;
