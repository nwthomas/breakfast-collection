import { createGlobalStyle } from "styled-components";
import GlobalStyle from "./global";
import ResetStyle from "./reset";

const GlobalStyleWithReset = createGlobalStyle`
    ${ResetStyle}
    ${GlobalStyle}
`;

export default GlobalStyleWithReset;
