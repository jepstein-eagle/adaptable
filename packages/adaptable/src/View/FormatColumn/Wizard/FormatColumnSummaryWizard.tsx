import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StyleVisualItem } from '../../Components/StyleVisualItem';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { FormatColumn } from '../../../PredefinedConfig/FormatColumnState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import UIHelper from '../../UIHelper';
import FormatHelper from '../../../Utilities/Helpers/FormatHelper';

export interface FormatColumnSummaryWizardProps extends AdaptableWizardStepProps<FormatColumn> {}
export class FormatColumnSummaryWizard extends React.Component<FormatColumnSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: FormatColumnSummaryWizardProps) {
    super(props);
    this.state = { Style: this.props.Data.Style };
  }

  render() {
    let adaptableColumn: AdaptableColumn = ColumnHelper.getColumnFromId(
      this.props.Data.ColumnId,
      this.props.Columns
    );

    let keyValuePairs: KeyValuePair[] = [
      {
        Key: 'Column',
        Value: ColumnHelper.getFriendlyNameFromColumnId(
          this.props.Data.ColumnId,
          this.props.Columns
        ),
      },

      {
        Key: 'Style',
        Value:
          this.props.Data.Style == null || UIHelper.IsEmptyStyle(this.props.Data.Style) ? (
            '[None]'
          ) : (
            <StyleVisualItem Style={this.props.Data.Style} />
          ),
      },
      {
        Key: 'Format',
        Value: this.showFormatExample(this.props.Data, adaptableColumn),
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.FormatColumnStrategyFriendlyName}
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
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }

  private showFormatExample(
    formatColumn: FormatColumn,
    adaptableColumn: AdaptableColumn
  ): string | undefined {
    if (!formatColumn.DisplayFormat) {
      return '[None]';
    }
    if (formatColumn.DisplayFormat.Formatter === 'DateFormatter') {
      return FormatHelper.DateFormatter(new Date(), formatColumn.DisplayFormat.Options);
    }
    if (formatColumn.DisplayFormat.Formatter === 'NumberFormatter') {
      return FormatHelper.NumberFormatter(12345.6789, formatColumn.DisplayFormat.Options);
    }
  }
}
