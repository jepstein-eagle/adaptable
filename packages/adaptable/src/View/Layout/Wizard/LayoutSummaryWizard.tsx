import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import ArrayExtensions from '../../../Utilities/Extensions/ArrayExtensions';

export interface LayoutSummaryWizardProps extends AdaptableWizardStepProps<Layout> {}

export class LayoutSummaryWizard extends React.Component<LayoutSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: LayoutSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Name },
      { Key: 'Columns', Value: this.getColumnNames(this.props.Data.Columns) },
      {
        Key: 'Column Sorts',
        Value: this.props.Adaptable.LayoutService.getColumnSort(
          this.props.Data.ColumnSorts,
          this.props.Columns
        ),
      },
      { Key: 'Grouped Columns', Value: this.getColumnNames(this.props.Data.GroupedColumns) },
    ];
    let pivotKeyValuePairs: KeyValuePair[] = [];
    if (this.props.Adaptable.LayoutService.isPivotedLayout(this.props.Data.PivotDetails)) {
      pivotKeyValuePairs = [
        {
          Key: 'Pivot Columns',
          Value: this.getColumnNames(this.props.Data.PivotDetails.PivotColumns),
        },
        {
          Key: 'Aggregation Columns',
          Value: this.getColumnNames(this.props.Data.PivotDetails.AggregationColumns),
        },
      ];
    }

    return (
      <WizardSummaryPage
        KeyValuePairs={[...keyValuePairs, ...pivotKeyValuePairs]}
        header={StrategyConstants.LayoutStrategyFriendlyName}
      />
    );
  }
  public canNext(): boolean {
    return true;
  }

  private getColumnNames(columns: string[]): string {
    return ArrayExtensions.IsNotNullOrEmpty(columns)
      ? this.props.Adaptable.api.gridApi.getFriendlyNamesFromColumnIds(columns).join(', ')
      : 'None';
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
