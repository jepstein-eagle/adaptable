import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import AppJS from './AppJS';
import AppAgGrid from './App-AgGrid';
import AppAgGridJS from './App-AgGridJS';
import './index.css';
// import the main style file
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
ReactDOM.render(<AppAgGrid />, document.getElementById('root-aggrid') as HTMLElement);
registerServiceWorker();
