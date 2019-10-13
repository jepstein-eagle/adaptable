import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';
import { LayoutHelper } from '../../../Utilities/Helpers/LayoutHelper';
import { Layout } from '../../../PredefinedConfig/RunTimeState/LayoutState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { IKeyValuePair } from '../../../Utilities/Interface/IKeyValuePair';

export interface LayoutSummaryWizardProps extends AdaptableWizardStepProps<Layout> {}

export class LayoutSummaryWizard extends React.Component<LayoutSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: LayoutSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let keyValuePairs: IKeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Name },
      { Key: 'Columns', Value: this.getColumnNames() },
      {
        Key: 'Column Sorts',
        Value: LayoutHelper.getColumnSort(this.props.Data.ColumnSorts, this.props.Columns),
      },
    ];

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.LayoutStrategyName}
      />
    );
    return <div>{summaryPage}</div>;
  }
  public canNext(): boolean {
    return true;
  }

  private getColumnNames(): string {
    return ColumnHelper.getFriendlyNamesFromColumnIds(
      this.props.Data.Columns,
      this.props.Columns
    ).join(', ');
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
