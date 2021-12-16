import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --color-dark-blue: rgb(35, 61, 77);
    --color-orange: rgb(254, 127, 45);
    --color-yellow: rgb(252, 202, 70);
    --color-LightGreen: rgb(161, 193, 129);
    --color-darkGreen:rgb(97, 155, 138)
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, select {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-size: 100%;
    vertical-align: baseline;
    /* font-family: 'Poppins', sans-serif; */
    font-family: 'Ubuntu', sans-serif;
}
input {
    /* font-family: 'Poppins', sans-serif; */
    font-family: 'Ubuntu', sans-serif;
}
html, body {
   
}

`;
