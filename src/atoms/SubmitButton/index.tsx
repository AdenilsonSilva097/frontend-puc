import React from "react";

import * as Styled from "./styles";

interface ISubmitButton {
  text: string
}

const SubmitButton: React.FC<ISubmitButton> = ({ text, ...rest }) => (
  <Styled.ButtonContainer variant="contained" type="submit" {...rest}>
    {text}
  </Styled.ButtonContainer>
);

export default SubmitButton;
