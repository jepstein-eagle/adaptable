import OverlayTrigger from '../../../../App_Scripts/components/OverlayTrigger';

import '../../../../App_Scripts/base-new.scss';

import React, { useState } from 'react';
import { Button, Box } from 'rebass';

export default () => {
  if (!global.document) {
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
          hideEvent="x"
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
          <Button
            marginTop={40}
            marginLeft={300}
            style={{ xposition: 'absolute', right: 0, top: 200 }}
          >
            xyz
          </Button>
        </OverlayTrigger>
      </Box>
    </div>
  );
};
