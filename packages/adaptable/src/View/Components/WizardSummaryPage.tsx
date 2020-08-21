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
    <WizardPanel bodyProps={{ padding: 0 }} className="ab-WizardSummary">
      <DataSource<KeyValuePair>
        data={props.KeyValuePairs}
        fields={['Key', 'Value']}
        primaryKey="Key"
      >
        <Grid
          domProps={{
            className: 'ab-WizardSummary__list',
            style: {
              height: '100%',
              margin: '10px',
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
