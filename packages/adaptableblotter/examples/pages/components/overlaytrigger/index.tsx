import OverlayTrigger from '../../../../App_Scripts/components/OverlayTrigger';

import '../../../../App_Scripts/base.scss';

import React, { useState } from 'react';
import { Button, Box } from 'rebass';

export default () => {
  if (!(global as any).document) {
    return null;
  }
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <h2>test</h2>

      <Box
        className="x "
        padding={100}
        paddingTop={200}
        style={{ maxWidth: 450, border: '1px dashed red' }}
      >
        <OverlayTrigger
          style={{ position: 'relative' }}
          constrainTo=".x"
          showEvent="click"
          render={() => (
            <b
              style={{
                padding: 30,
                border: '2px solid blue',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              xxx button Nostrud culpa magna reprehenderit amet id
            </b>
          )}
        >
          <Button marginTop={40} marginLeft={300}>
            xyz
          </Button>
        </OverlayTrigger>
      </Box>
    </div>
  );
};
