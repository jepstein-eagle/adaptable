import * as React from 'react';
import { KeyValuePair } from '../../Utilities/Interface/KeyValuePair';
import WizardPanel from '../../components/WizardPanel';

import { DataSource, GridFactory } from '@adaptabletools/grid';

export interface WizardSummaryPageProps {
  KeyValuePairs: KeyValuePair[];
  header?: string;
}

const Grid = GridFactory<KeyValuePair>();

export const WizardSummaryPage = (props: WizardSummaryPageProps) => {
  return (
    <WizardPanel bodyProps={{ padding: 0 }}>
      <DataSource<KeyValuePair>
        data={props.KeyValuePairs}
        fields={['Key', 'Value']}
        primaryKey="Key"
      >
        <Grid
          domProps={{
            style: {
              height: '100%',
            },
          }}
          columns={[
            { field: 'Key', header: 'Property', flex: 1 },
            { field: 'Value', header: 'Value', flex: 3 },
          ]}
        ></Grid>
      </DataSource>
    </WizardPanel>
  );
};
