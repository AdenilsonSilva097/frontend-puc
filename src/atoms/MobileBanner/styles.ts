import styled from "styled-components";

export const MobileBannerContainer = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 234px;
  border-radius: 0px 0vh 20px 0px;
  padding-top: 20px;
  background-color: ${(props) => props.theme.colors.primary};
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 0;
`;
