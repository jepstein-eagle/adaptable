import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { CustomSort } from '../../../PredefinedConfig/CustomSortState';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';

export interface CustomSortSummaryWizardProps extends AdaptableWizardStepProps<CustomSort> {}

export class CustomSortSummaryWizard extends React.Component<CustomSortSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: CustomSortSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      {
        Key: 'Column',
        Value: this.props.api.columnApi.getFriendlyNameFromColumnId(this.props.data.ColumnId),
      },

      { Key: 'Values', Value: this.props.data.SortedValues.join(', ') },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.CustomSortStrategyFriendlyName}
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
    //todo
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
