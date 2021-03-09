import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family: Roboto;
        padding:0;
        margin:0;
    }
    button{
        outline:none;
        background-color:white;
        border-radius: 5px;
        border:1px solid black;
        cursor:pointer;
    }
`;

export default GlobalStyles;
