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
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import UIHelper from '../../UIHelper';
import FormatHelper from '../../../Utilities/Helpers/FormatHelper';

export interface FormatColumnSummaryWizardProps extends AdaptableWizardStepProps<FormatColumn> {}
export class FormatColumnSummaryWizard extends React.Component<FormatColumnSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: FormatColumnSummaryWizardProps) {
    super(props);
    this.state = { Style: this.props.data.Style };
  }

  render() {
    let keyValuePairs: KeyValuePair[] = [
      {
        Key: 'Scope',
        Value: this.props.api.scopeApi.getScopeDescription(this.props.data.Scope),
      },

      {
        Key: 'Style',
        Value:
          this.props.data.Style == null || UIHelper.IsEmptyStyle(this.props.data.Style) ? (
            '[None]'
          ) : (
            <StyleVisualItem Style={this.props.data.Style} />
          ),
      },
      {
        Key: 'Format',
        Value: this.showFormatExample(this.props.data),
      },
      {
        Key: 'Cell Alignment',
        Value: this.props.data.CellAlignment,
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
  public next(): void {
    // todo
  }
  public back(): void {
    // todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }

  private showFormatExample(formatColumn: FormatColumn): string | undefined {
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
