import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';
import { LayoutHelper } from '../../../Utilities/Helpers/LayoutHelper';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
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
        Value: LayoutHelper.getColumnSort(this.props.Data.ColumnSorts, this.props.Columns),
      },
      { Key: 'Grouped Columns', Value: this.getColumnNames(this.props.Data.GroupedColumns) },
    ];
    let pivotKeyValuePairs: KeyValuePair[] = [];
    if (LayoutHelper.isPivotedLayout(this.props.Data.PivotDetails)) {
      pivotKeyValuePairs = [
        {
          Key: 'Pivot Group Columns',
          Value: this.getColumnNames(this.props.Data.PivotDetails.PivotGroupedColumns),
        },
        {
          Key: 'Pivot Header Columns',
          Value: this.getColumnNames(this.props.Data.PivotDetails.PivotHeaderColumns),
        },
        {
          Key: 'Pivot Aggregation Columns',
          Value: this.getColumnNames(this.props.Data.PivotDetails.PivotAggregationColumns),
        },
      ];
    }

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={[...keyValuePairs, ...pivotKeyValuePairs]}
        header={StrategyConstants.LayoutStrategyName}
      />
    );
    return <div>{summaryPage}</div>;
  }
  public canNext(): boolean {
    return true;
  }

  private getColumnNames(columns: string[]): string {
    return ArrayExtensions.IsNotNullOrEmpty(columns)
      ? ColumnHelper.getFriendlyNamesFromColumnIds(columns, this.props.Columns).join(', ')
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
