import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';

import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { IKeyValuePair } from '../../../Utilities/Interface/IKeyValuePair';
import { SparklineColumn } from '../../../PredefinedConfig/DesignTimeState/SparklineColumnState';

export interface SparklineSummaryWizardProps extends AdaptableWizardStepProps<SparklineColumn> {}

export class SparklineSummaryWizard extends React.Component<SparklineSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: SparklineSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let keyValuePairs: IKeyValuePair[] = [
      {
        Key: 'Column',
        Value: ColumnHelper.getFriendlyNameFromColumnId(
          this.props.Data.ColumnId,
          this.props.Columns
        ),
      },
      {
        Key: 'Minimum Value',
        Value:
          this.props.Data.MinimumValueColumnId == null
            ? this.props.Data.MinimumValue
            : '[' +
              ColumnHelper.getFriendlyNameFromColumnId(
                this.props.Data.MinimumValueColumnId,
                this.props.Columns
              ) +
              ']',
      },
      {
        Key: 'Maximum Value',
        Value:
          this.props.Data.MaximumValueColumnId == null
            ? this.props.Data.MaximumValue
            : '[' +
              ColumnHelper.getFriendlyNameFromColumnId(
                this.props.Data.MaximumValueColumnId,
                this.props.Columns
              ) +
              ']',
      },
    ];

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.SparklinesStrategyName}
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
