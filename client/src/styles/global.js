import { css } from "styled-components";

const GlobalStyle = css`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  html,
  body {
    background-color: #fafafa;
  }
  html,
  body {
    letter-spacing: -1px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: "ObjectSans", Helvetica, sans-serif;
    margin-bottom: 30px;
  }
  h1 {
    background-clip: text;
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    text-fill-color: transparent;
    font-size: 4rem;
    font-weight: bold;
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }
  h2 {
    font-size: 3rem;
  }
  h3 {
    font-size: 1.6rem;
  }

  p,
  a {
    font-family: "ObjectSans", Helvetica, sans-serif;
    font-size: 2rem;
  }

  button {
    align-items: center;
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    border: none;
    color: white;
    display: flex;
    font-family: "ObjectSans", Helvetica, sans-serif;
    font-size: 1.6rem;
    font-weight: bold;
    height: 50px;
    justify-content: center;
    width: 200px;
    -webkit-box-shadow: 0px 9px 16px -4px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 9px 16px -4px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 9px 16px -4px rgba(0, 0, 0, 0.1);
    transition: 0.3s transform, 0.3s box-shadow;

    &:hover {
      cursor: pointer;
      transform: translateY(-1px);
      -webkit-box-shadow: 0px 9px 16px -4px rgba(0, 0, 0, 0.17);
      -moz-box-shadow: 0px 9px 16px -4px rgba(0, 0, 0, 0.17);
      box-shadow: 0px 9px 16px -4px rgba(0, 0, 0, 0.17);
    }
  }
`;

export default GlobalStyle;
