import { createGlobalStyle } from "styled-components";

export const windowWidth = {
  uhd: "2560px",
  laptop: {
    large: "1440px",
    medium: "1024px"
  },
  tablet: "768px",
  mobile: {
    large: "425px",
    medium: "375px",
    small: "320px"
  }
};

export default createGlobalStyle`
  * {
    font-family: 'Poppins', 'Roboto';
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    
    > body {
      overflow: hidden;
    }
    
    > a {
      border: none !important;
      outline: none !important;
      text-decoration: none !important;
      color: ${(props) => props.theme.colors.primary};
      font-weight: bold;

      &:hover,
      &:focus {
        border-bottom: 2px solid ${(props) => props.theme.colors.primary};
      }
    }

    .MuiOutlinedInput-root {
      border-radius: 15px !important;
    }
    
    .field {
      min-width: 140px !important;
      min-height: 65px !important;
    }

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      /* background: #f1f1f1; */
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: rgb(190,190,190);
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: rgb(190,190,190);
      border-radius: 10px;
    }
  }
`;
