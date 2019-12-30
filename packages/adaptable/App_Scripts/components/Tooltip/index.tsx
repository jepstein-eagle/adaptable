import * as React from 'react';
import OverlayTrigger from '../OverlayTrigger';

const Tooltip = ({ label, children }: { label?: React.ReactNode; children: React.ReactNode }) => {
  return (
    <OverlayTrigger defaultZIndex={2000000} className="ab-Tooltip" render={() => label}>
      {children}
    </OverlayTrigger>
  );
};

export default Tooltip;
