import { createGlobalStyle } from 'styled-components';
import { light } from './palette';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'Open Sans', sans-serif !important;
  }
  html, body, #root {
    height: 100%;
    background-color: var(--super-light-grey-color);
  }

  :root{
  --primary-color: ${light.primary};
  --primary-color-translucent: #F1EBFD;
  --light-primary-color: ${light.primaryDark};  
  --dark-primary-color: #2E6E99;
  --error: ${light.error.dark};
  --error-translucent:  ${light.error.light};
  --blue-color: #35ace0;
  --light-blue-color: #c3d6e3;

  --dark-yellow-color: #E1AF3F;
  --light-yellow-color: #F5DFAD;

  --light-grey-color: #e8e8e8;
  --grey-color: #c6cbd4;
  --dark-grey-color: #333333;
  --super-light-grey-color: #fafafa;
  }

  body {
    margin: 0;
    padding: 0;
    color: #333333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    overflow-y: ${props => (props.modalOpen ? 'hidden' : 'scroll')};
  }

  p {
      margin: 0;
  }

  .bold {
    font-weight: 600;
  }

  *::-webkit-scrollbar {
    width: 5px;
    margin-left: -2px;
    background: rgba(0, 0, 0, .05);
  }

  *::-webkit-scrollbar-track {
    border-radius: 2px;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: rgba(0, 0, 0, .15);
  }

  *::-webkit-scrollbar:horizontal {
    height: 5px;
  }

  *::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0, 0, 0, .1);
  }
`;

export default GlobalStyle;
