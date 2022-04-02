import styled from "styled-components";

const NavbarMobileContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  z-index: 2;

  >:nth-child(2) {
    width: 110px;

    > :first-child {
      width: 100%;
      height: 20px;
    }
  }

`;

export { NavbarMobileContainer };
