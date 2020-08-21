import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
export interface ColumnCategorySummaryWizardProps
  extends AdaptableWizardStepProps<ColumnCategory> {}

export class ColumnCategorySummaryWizard
  extends React.Component<ColumnCategorySummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: ColumnCategorySummaryWizardProps) {
    super(props);
  }
  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.ColumnCategoryId },
      { Key: 'Columns', Value: this.getColumnNames() },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ColumnCategoryStrategyFriendlyName}
      />
    );
  }
  public canNext(): boolean {
    return true;
  }

  private getColumnNames(): string {
    return this.props.Api.columnApi
      .getFriendlyNamesFromColumnIds(this.props.Data.ColumnIds)
      .join(', ');
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    //
  }
  public Back(): void {
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
