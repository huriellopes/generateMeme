import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    background: #eee;
  }

  button {
    cursor: pointer;
  }
`
