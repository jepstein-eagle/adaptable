import * as React from 'react';
import { IColItem } from '../UIInterfaces';
import { WizardSummaryRow } from './WizardSummaryRow';
import { AdaptableObjectCollection } from './AdaptableObjectCollection';
import { KeyValuePair } from '../../Utilities/Interface/KeyValuePair';
import WizardPanel from '../../components/WizardPanel';

export interface WizardSummaryPageProps extends React.ClassAttributes<WizardSummaryPage> {
  KeyValuePairs: KeyValuePair[];
  header: string;
}

export class WizardSummaryPage extends React.Component<WizardSummaryPageProps, {}> {
  render(): any {
    let colItems: IColItem[] = [
      { Content: 'Property', Size: 3 },
      { Content: 'Value', Size: 9 },
    ];

    let summaryRows: any[] = [];
    this.props.KeyValuePairs.forEach((kvp, index) => {
      summaryRows.push(
        <WizardSummaryRow
          key={index}
          colItems={colItems}
          propertyName={kvp.Key}
          propertyValue={kvp.Value}
        />
      );
    });

    return (
      <WizardPanel bodyProps={{ padding: 0 }}>
        <AdaptableObjectCollection colItems={colItems} items={summaryRows} />
      </WizardPanel>
    );
  }
}
