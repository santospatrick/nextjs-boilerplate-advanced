import { css } from "@emotion/react";

export default css`
  html,
  body,
  #__next {
    height: 100%;
    margin: 0;
  }
  html {
    word-break: normal;
  }
  #__next {
    display: flex;
    flex-direction: column;
  }
  body {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset;
    box-shadow: 0 0 0 30px white inset;
  }

  #nprogress .bar {
    height: 5px;
  }
`;
