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
  const [showGrid, setShowGrid] = useState(true);

  return (
    <div className="container">
      <button
        onClick={() => {
          setShowGrid(!showGrid);
        }}
      >
        toggle second grid
      </button>
      <Grid />
      {showGrid && <Grid />}
    </div>
  );
};
