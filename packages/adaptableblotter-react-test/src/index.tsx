import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import AppJS from './AppJS';
import AppAgGrid from './App-AgGrid';
import AppAgGridJS from './App-AgGridJS';
import './index.css';
// import the main style file
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <AppJS />,
  document.getElementById('root') as HTMLElement
);
ReactDOM.render(
  <AppAgGridJS />,
  document.getElementById('root-aggrid') as HTMLElement
);
registerServiceWorker();
