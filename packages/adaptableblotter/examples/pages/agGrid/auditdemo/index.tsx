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
      <div id="adaptableBlotter" style={{ margin: 0 }} />

      {/*  <!-- div for the underlying grid - please always call this 'grid' or set the 'vendorContainer' property in IAdaptableBlotterOptions-- >*/}

      <div id="grid" className="ag-theme-blue" style={{ margin: 5 }} />

      <DynamicComponent />
    </>
  );
};
