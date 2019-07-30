import * as React from 'react';
import { IColItem } from '../UIInterfaces';
import { WizardSummaryRow } from './WizardSummaryRow';
import { AdaptableObjectCollection } from './AdaptableObjectCollection';
import { IKeyValuePair } from '../../Utilities/Interface/IKeyValuePair';
import WizardPanel from '../../components/WizardPanel';

export interface WizardSummaryPageProps extends React.ClassAttributes<WizardSummaryPage> {
  KeyValuePairs: IKeyValuePair[];
  cssClassName?: string;
  header: string;
}

export class WizardSummaryPage extends React.Component<WizardSummaryPageProps, {}> {
  render(): any {
    let colItems: IColItem[] = [{ Content: 'Property', Size: 4 }, { Content: 'Value', Size: 8 }];

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
        <AdaptableObjectCollection
          //
          colItems={colItems}
          items={summaryRows}
        />
      </WizardPanel>
    );
  }
}
