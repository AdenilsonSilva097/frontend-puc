import React from "react";

import * as Styled from "./styles";

interface IProps {
  index: number;
  doador: string;
  endereco: string;
}

const ItineraryItem: React.FC<IProps> = ({ index, doador, endereco }) => (
  <Styled.Container href={`https://google.com/maps/place/${endereco.replace(" ", "+")}`} target="_blank">
    <Styled.Index>{index}</Styled.Index>
    <Styled.Infos>
      <Styled.Title>{doador}</Styled.Title>
      <Styled.Description>{endereco}</Styled.Description>
    </Styled.Infos>
  </Styled.Container>
);

export default ItineraryItem;
