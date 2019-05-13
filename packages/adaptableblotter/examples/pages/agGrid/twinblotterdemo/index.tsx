import React from 'react';
import dynamic from 'next/dynamic';
import './index.css';

const DynamicComponent = dynamic(() => import('./agGrid'), {
  loading: () => null,
  ssr: false,
});

export default () => {
  return (
    <>
      <div id="adaptableBlotter1" style={{ margin: 0 }} />
      <div id="grid1" className="ag-theme-balham" style={{ margin: 5, height: 200 }} />
      <br />
      <div id="adaptableBlotter2" style={{ margin: 0 }} />
      <div id="grid2" className="ag-theme-balham" style={{ margin: 5, height: 200 }} />

      <DynamicComponent />
    </>
  );
};
