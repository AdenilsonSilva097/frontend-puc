import React from "react";

import { ButtonField } from "./styles";

interface ButtonProps {
  caption: string;
  type?: "button" | "reset" | "submit";
  color?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ caption, type, color }) => (
  <ButtonField color={color} type={type}>
    {caption}
  </ButtonField>
);

Button.defaultProps = {
  type: "submit",
  color: "primary"
};

export default Button;
