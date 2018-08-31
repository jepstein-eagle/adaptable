import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import the main style file
import 'adaptableblotter-react/dist/styles/adaptableblotter-style.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
