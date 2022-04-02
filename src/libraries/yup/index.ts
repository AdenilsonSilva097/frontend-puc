import { FormHandles } from "@unform/core";
import { ValidationError } from "yup";

import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    default: () => ({ key: "Campo inválido", values: {} }),
    required: () => ({ key: "Campo obrigatório", values: {} }),
    oneOf: ({ values }) => ({ key: "Campo deve ser um dos seguintes valores: {{values}}", values: { values } }),
    notOneOf: ({ values }) => ({ key: "Campo não deve ser um dos seguintes valores: {{values}}", values: { values } }),
    notType: ({ type }) => ({ key: "Implemente a mensagem de erro", values: { type } })
  },
  string: {
    length: ({ length }) => ({ key: "O campo deve ter exatamente {{length}} caracteres", values: { length } }),
    min: ({ min }) => ({ key: "O campo deve ter pelo menos {{min}} caracteres", values: { min } }),
    max: ({ max }) => ({ key: "O campo deve ter no máximo {{max}} caracteres", values: { max } }),
    matches: ({ regex }) => ({ key: "O campo deve corresponder a seguinte regra: \"{{regex}}\"", values: { regex } }),
    email: () => ({ key: "E-mail inválido", values: {} }),
    url: () => ({ key: "URL inválida", values: {} }),
    trim: () => ({ key: "O campo não deve conter espaços no início ou no fim", values: {} }),
    lowercase: () => ({ key: "O campo deve estar em minúsculo", values: {} }),
    uppercase: () => ({ key: "O campo deve estar em maiúsculo", values: {} })
  },
  number: {
    min: ({ min }) => ({ key: "O campo deve ser maior ou igual a {{min}}", values: { min } }),
    max: ({ max }) => ({ key: "O campo deve ser menor ou igual a {{max}}", values: { max } }),
    lessThan: ({ less }) => ({ key: "O campo deve ser menor que {{less}}", values: { less } }),
    moreThan: ({ more }) => ({ key: "O campo deve ser maior que {{more}}", values: { more } }),
    positive: () => ({ key: "O campo deve ser um número positivo", values: {} }),
    negative: () => ({ key: "O campo deve ser um número negativo", values: {} }),
    integer: () => ({ key: "O campo deve ser um número inteiro", values: {} })
  },
  date: {
    min: ({ min }) => ({ key: "A data deve ser posterior a {{min}}", values: { min } }),
    max: ({ max }) => ({ key: "A data deve ser anterior a {{max}}", values: { max } })
  },
  object: {
    noUnknown: ({ path }) => ({ key: "O campo tem chaves não especificadas: {{unknown}}", values: { path } })
  },
  array: {
    min: ({ min }) => ({ key: "O campo deve ter pelo menos {{min}} itens", values: { min } }),
    max: ({ max }) => ({ key: "O campo deve ter menos que {{max}} itens", values: { max } })
  }
});

export default Yup;

export type { FormHandles };
export { ValidationError };
