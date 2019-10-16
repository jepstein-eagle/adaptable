import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StyleVisualItem } from '../../Components/StyleVisualItem';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';
import { FormatColumn } from '../../../PredefinedConfig/RunTimeState/FormatColumnState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { IKeyValuePair } from '../../../Utilities/Interface/IKeyValuePair';

export interface FormatColumnSummaryWizardProps extends AdaptableWizardStepProps<FormatColumn> {}
export class FormatColumnSummaryWizard extends React.Component<FormatColumnSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: FormatColumnSummaryWizardProps) {
    super(props);
    this.state = { Style: this.props.Data.Style };
  }

  render() {
    let keyValuePairs: IKeyValuePair[] = [
      {
        Key: 'Column',
        Value: ColumnHelper.getFriendlyNameFromColumnId(
          this.props.Data.ColumnId,
          this.props.Columns
        ),
      },
      { Key: 'Style', Value: <StyleVisualItem Style={this.props.Data.Style} /> },
    ];

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.FormatColumnStrategyName}
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
    // todo
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
