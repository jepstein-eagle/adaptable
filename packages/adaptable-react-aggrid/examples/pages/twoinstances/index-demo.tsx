import React, { useState } from 'react';
import '../../../src/base.scss';
import '../../../src/themes/light.scss';
import '../../../src/themes/dark.scss';
import { ExamplesHelper } from '../../ExamplesHelper';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham-dark.css';

const examplesHelper = new ExamplesHelper();

const StatusCmp = (props: any) => (
  <div>
    <b>{props.value}!!!</b>
  </div>
);

import Grid from './Grid';
export default () => {
  const [showGrid1, setShowGrid1] = useState(true);
  const [showGrid2, setShowGrid2] = useState(false);

  return (
    <div className="container">
      <button
        onClick={() => {
          setShowGrid1(!showGrid1);
        }}
      >
        toggle 1
      </button>
      <button
        onClick={() => {
          setShowGrid2(!showGrid2);
        }}
      >
        toggle 2
      </button>
      {showGrid1 && <Grid />}
      {showGrid2 && <Grid />}
    </div>
  );
};
