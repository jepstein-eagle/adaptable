import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '@adaptabletools/adaptable/src/View/Components/WizardSummaryPage';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';

import { ColumnHelper } from '@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper';
import { KeyValuePair } from '@adaptabletools/adaptable/src/Utilities/Interface/KeyValuePair';
import { SparklineColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/SparklineColumnState';
import { AdaptableStyle } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableStyle';
import ObjectFactory from '@adaptabletools/adaptable/src/Utilities/ObjectFactory';
import { StyleVisualItem } from '@adaptabletools/adaptable/src/View/Components/StyleVisualItem';

export interface SparklineColumnSummaryWizardProps
  extends AdaptableWizardStepProps<SparklineColumn> {}

export class SparklineColumnSummaryWizard
  extends React.Component<SparklineColumnSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: SparklineColumnSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let lineColorStyle: AdaptableStyle = ObjectFactory.CreateEmptyStyle();
    lineColorStyle.BackColor = this.props.Data!.LineColor;
    lineColorStyle.ForeColor = this.props.Data!.LineColor;

    let keyValuePairs: KeyValuePair[] = [
      {
        Key: 'Column',
        Value: ColumnHelper.getFriendlyNameFromColumnId(
          this.props.Data!.ColumnId,
          this.props.Columns
        ),
      },
      {
        Key: 'Minimum Value',
        Value:
          this.props.Data!.MinimumValue == null ? 'Current cell' : this.props.Data!.MinimumValue,
      },
      {
        Key: 'Maximum Value',
        Value:
          this.props.Data!.MaximumValue == null ? 'Current cell' : this.props.Data!.MaximumValue,
      },
      { Key: 'Line Color', Value: <StyleVisualItem Style={lineColorStyle} /> },
      {
        Key: 'Show Tool Tip',
        Value: this.props.Data!.ShowToolTip ? 'True' : 'False',
      },
    ];

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.SparklineColumnStrategyFriendlyName}
      />
    );
    return <div>{summaryPage}</div>;
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    /* no implementation */
  }

  public Back(): void {
    /* no implementation */
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
