/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";

import NumberFormat from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<NumberFormat<number>, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value
            }
          });
        }}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        isNumericString
        prefix="R$"
      />
    );
  }
);

export default NumberFormatCustom;
