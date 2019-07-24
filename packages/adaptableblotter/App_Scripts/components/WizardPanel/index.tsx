import * as React from 'react';

import Panel, { PanelProps } from '../Panel';
import join from '../utils/join';

const WizardPanel = (props: PanelProps) => {
  return (
    <Panel
      border="none"
      borderRadius="none"
      variant="primary"
      bodyScroll={true}
      {...props}
      className={join(props.className, 'ab-WizardPanel')}
      style={{ height: '100%', ...props.style }}
    />
  );
};

export default WizardPanel;
