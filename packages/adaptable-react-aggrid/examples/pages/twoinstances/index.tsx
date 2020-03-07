import React from 'react';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./index-demo'), {
  loading: () => null,
  ssr: false,
});

export default () => <DynamicComponent />;
