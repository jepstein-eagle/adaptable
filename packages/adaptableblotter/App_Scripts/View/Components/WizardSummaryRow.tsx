import * as React from 'react';

import { AdaptableObjectRow } from './AdaptableObjectRow';
import { BaseRowProps } from './SharedProps/ConfigEntityRowProps';

import { IColItem } from '../UIInterfaces';

export interface WizardSummaryRowProps<WizardSummaryRow> extends BaseRowProps<WizardSummaryRow> {
  propertyName: string;
  propertyValue: any;
}

export class WizardSummaryRow extends React.Component<WizardSummaryRowProps<WizardSummaryRow>, {}> {
  render(): any {
    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = this.props.propertyName;
    colItems[1].Content = this.props.propertyValue;

    return <AdaptableObjectRow colItems={colItems} fontSize={'medium'} />;
  }
}
