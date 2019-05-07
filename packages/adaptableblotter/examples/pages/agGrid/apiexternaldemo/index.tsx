import React from 'react';
import dynamic from 'next/dynamic';
import './index.css'
import { Button } from 'react-bootstrap';

const DynamicComponent = dynamic(
  () => import('./agGrid'),
  {
    loading: () => null,
    ssr: false
  }
);

export default () => {
  return (
    <>
    
    <div id="">
    <br />
    <label>Quick Search (from client application via Adaptable Blotter API): </label>
    <input type="text" id="txtQuickSearchText" />
      {/*
        <Button onClick={runQuickSearchViaAPI()}>Run</Button>
        <button title="Clear" onclick=clearQuickSearchViaAPI()>Clear</button>
      */}
    </div>
    

      <div id="adaptableBlotter" style={{ margin: 0 }}></div>

      {/*  <!-- div for the underlying grid - please always call this 'grid' or set the 'vendorContainer' property in IAdaptableBlotterOptions-- >*/} 
      <div id="grid" style={{ margin: 5 }}></div>

      <DynamicComponent />
    </>
  );
};
