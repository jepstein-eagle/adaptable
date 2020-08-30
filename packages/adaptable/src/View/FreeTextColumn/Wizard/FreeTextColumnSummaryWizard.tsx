import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';

import { FreeTextColumn } from '../../../PredefinedConfig/FreeTextColumnState';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';

export interface FreeTextColumnSummaryWizardProps
  extends AdaptableWizardStepProps<FreeTextColumn> {}
export class FreeTextColumnSummaryWizard
  extends React.Component<FreeTextColumnSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: FreeTextColumnSummaryWizardProps) {
    super(props);
    this.state = { ColumnId: this.props.data.ColumnId };
  }

  render() {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Column Id', Value: this.props.data.ColumnId },
      { Key: 'Column Name', Value: this.props.data.FriendlyName },
      {
        Key: 'Default Value',
        Value: StringExtensions.IsNullOrEmpty(this.props.data.DefaultValue)
          ? '[None]'
          : this.props.data.DefaultValue,
      },
      {
        Key: 'No. Stored Values',
        Value: ArrayExtensions.IsNullOrEmpty(this.props.data.FreeTextStoredValues)
          ? 0
          : this.props.data.FreeTextStoredValues.length,
      },
      { Key: 'Text Editor', Value: this.props.data.TextEditor },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.FreeTextColumnStrategyFriendlyName}
      />
    );
  }

  public canNext(): boolean {
    return true;
  }
  public canBack(): boolean {
    return true;
  }
  public next(): void {
    // todo
  }
  public back(): void {
    // todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
