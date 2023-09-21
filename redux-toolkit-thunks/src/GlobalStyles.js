import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
*,
*::after,
*::before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html{
    font-size: 66.5%;
}

body {
    font-family: monospace;
    color: #222; 
    background-color: #eee;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
    padding: 2rem;
}

input,
button   {
    font: inherit;
    color: inherit;
}

button {
    cursor: pointer;
}

*:disabled {
    cursor: not-allowed;
    opacity: 0.7;
}

input:focus, 
button:focus
{
    outline: 1.8px solid rgba(0,0,0, .7);
}

`;

export default GlobalStyles;
