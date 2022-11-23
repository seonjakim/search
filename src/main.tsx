import React from 'react';

import ReactDOM from 'react-dom/client';

import {
  css,
  Global,
} from '@emotion/react';

import App from './App';

const globalCss = css({
  "*": {
    boxSizing: "border-box",
    fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
  },
  h6: {
    margin: "0",
  },
  h2: {
    margin: "0",
  },
  body: {
    fontSize: "16px",
    ":has(.portal)": {
      overflow: "hidden",
    },
  },
  button: {
    border: "none",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Global styles={globalCss} />
    <App />
  </React.StrictMode>
);
