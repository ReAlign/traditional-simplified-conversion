import React from 'react';
import ReactDom from 'react-dom';

import App from './app/app';

let getRootNode = () => {
  let _node = document.getElementById('app-container');
  renderApp(_node);
};

let renderApp = _node => {
  ReactDom.render(<App />, _node);
};

getRootNode();