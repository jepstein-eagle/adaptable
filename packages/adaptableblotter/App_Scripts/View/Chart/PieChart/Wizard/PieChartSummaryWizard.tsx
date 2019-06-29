import * as React from 'react';
import * as StrategyConstants from '../../../../Utilities/Constants/StrategyConstants';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '../../../Wizard/Interface/IAdaptableWizard';
import { PieChartDefinition } from '../../../../PredefinedConfig/RunTimeState/ChartState';
import { ColumnHelper } from '../../../../Utilities/Helpers/ColumnHelper';
import { IKeyValuePair } from '../../../../Utilities/Interface/IKeyValuePair';
import { WizardSummaryPage } from '../../../Components/WizardSummaryPage';
import { StringExtensions } from '../../../../Utilities/Extensions/StringExtensions';

export interface PieChartSummaryWizardProps extends AdaptableWizardStepProps<PieChartDefinition> {}

export class PieChartSummaryWizard extends React.Component<PieChartSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: PieChartSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let cssClassName: string = this.props.cssClassName + '-summary';

    let primaryColumnFriendlyName: string = ColumnHelper.getFriendlyNameFromColumnId(
      this.props.Data.PrimaryColumnId,
      this.props.Columns
    );
    let seondaryColumnFriendlyName: string = StringExtensions.IsNullOrEmpty(
      this.props.Data.SecondaryColumnId
    )
      ? '[None]'
      : ColumnHelper.getFriendlyNameFromColumnId(
          this.props.Data.SecondaryColumnId,
          this.props.Columns
        );

    let seondaryColumnOperation: string = StringExtensions.IsNullOrEmpty(
      this.props.Data.SecondaryColumnId
    )
      ? ''
      : this.props.Data.SecondaryColumnOperation;

    let rowsDescription: string = this.props.Data.VisibleRowsOnly ? 'Visible Rows' : 'All Rows';

    let keyValuePairs: IKeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Name },
      { Key: 'Description', Value: this.props.Data.Description },
      { Key: 'Primary Column', Value: primaryColumnFriendlyName },
      { Key: 'Secondary Column', Value: seondaryColumnFriendlyName },
      { Key: 'Operation', Value: seondaryColumnOperation },
      { Key: 'Rows in Chart', Value: rowsDescription },
    ];

    let summaryPage = (
      <WizardSummaryPage
        cssClassName={cssClassName}
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ChartStrategyName}
      />
    );
    return <div className={cssClassName}>{summaryPage}</div>;
  }

  public canNext(): boolean {
    return true;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    //
  }
  public Back(): void {
    //
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
