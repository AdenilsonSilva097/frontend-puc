import React from "react";
import { ReactSVG } from "react-svg";

import Empatieselogo from "../../assets/logotipo.svg";

import { EmpatieseLogotipoContainer } from "./styles";

interface EmpatieseLogotipoProps {
  color: "primary" | "secondary"
}

const EmpatieseLogotipo: React.FC<EmpatieseLogotipoProps> = ({ color }) => (
  <EmpatieseLogotipoContainer color={color}>
    <ReactSVG className="logoSVG" src={Empatieselogo} />
  </EmpatieseLogotipoContainer>
);

export default EmpatieseLogotipo;
