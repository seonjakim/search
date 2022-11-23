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
    fontSize: "16px",
  },
  h6: {
    margin: "0",
  },
  h2: {
    margin: "0",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Global styles={globalCss} />
    <App />
  </React.StrictMode>
);
