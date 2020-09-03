import * as React from 'react';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { PieChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { KeyValuePair } from '@adaptabletools/adaptable/src/Utilities/Interface/KeyValuePair';
import { WizardSummaryPage } from '@adaptabletools/adaptable/src/View/Components/WizardSummaryPage';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';

export interface PieChartSummaryWizardProps extends AdaptableWizardStepProps<PieChartDefinition> {}

export class PieChartSummaryWizard extends React.Component<PieChartSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: PieChartSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let primaryColumnFriendlyName: string = this.props.api.columnApi.getFriendlyNameFromColumnId(
      this.props.data.PrimaryColumnId
    );
    let seondaryColumnFriendlyName: string = StringExtensions.IsNullOrEmpty(
      this.props.data.SecondaryColumnId
    )
      ? '[None]'
      : this.props.api.columnApi.getFriendlyNameFromColumnId(this.props.data.SecondaryColumnId);

    let seondaryColumnOperation: string = StringExtensions.IsNullOrEmpty(
      this.props.data.SecondaryColumnId
    )
      ? ''
      : this.props.data.SecondaryColumnOperation;

    let rowsDescription: string = this.props.data.VisibleRowsOnly ? 'Visible Rows' : 'All Rows';

    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.data.Name },
      { Key: 'Description', Value: this.props.data.Description },
      { Key: 'Primary Column', Value: primaryColumnFriendlyName },
      { Key: 'Secondary Column', Value: seondaryColumnFriendlyName },
      { Key: 'Operation', Value: seondaryColumnOperation },
      { Key: 'Rows in Chart', Value: rowsDescription },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ChartStrategyFriendlyName}
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
    //
  }
  public back(): void {
    //
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
