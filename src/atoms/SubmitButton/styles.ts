import styled from "styled-components";

import { Button } from "../../libraries/mui/components";

export const ButtonContainer = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary} !important;
  border-radius: 20px !important;
  min-width: 150px !important;
  min-height: 40px !important;
`;
