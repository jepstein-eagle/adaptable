import React from 'react';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./with-render-function-demo'), {
  loading: () => null,
  ssr: false,
});

export default () => <DynamicComponent />;
