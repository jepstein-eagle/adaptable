import React from 'react';
import dynamic from 'next/dynamic';
import './index.css';

const DynamicComponent = dynamic(() => import('./agGrid'), {
  loading: () => null,
  ssr: false,
});

export default () => (
  <>
    <div id="adaptable" style={{ margin: 0 }} />

    {/*  <!-- div for the underlying grid - please always call this 'grid' or set the 'vendorContainer' property in AdaptableOptions-- > */}

    <div id="grid" className="ag-theme-balham" style={{ margin: 5 }} />

    <DynamicComponent />
  </>
);
