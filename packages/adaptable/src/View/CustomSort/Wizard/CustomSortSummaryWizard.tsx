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
        Value: this.props.Api.gridApi.getFriendlyNameFromColumnId(this.props.Data.ColumnId),
      },

      { Key: 'Values', Value: this.props.Data.SortedValues.join(', ') },
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
  public Next(): void {
    // todo
  }
  public Back(): void {
    //todo
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
