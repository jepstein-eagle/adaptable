import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableStyle } from '../../../PredefinedConfig/Common/AdaptableStyle';
import { PercentBar } from '../../../PredefinedConfig/PercentBarState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { StyleVisualItem } from '../../Components/StyleVisualItem';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

export interface PercentBarSummaryWizardProps extends AdaptableWizardStepProps<PercentBar> {}

export class PercentBarSummaryWizard extends React.Component<PercentBarSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: PercentBarSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let keyValuePairs: KeyValuePair[] = [];
    if (this.props.Data) {
      let positiveStyle: AdaptableStyle = ObjectFactory.CreateEmptyStyle();
      positiveStyle.BackColor = this.props.Data.PositiveColor;
      positiveStyle.ForeColor = this.props.Data.PositiveColor;
      let negativeStyle: AdaptableStyle = ObjectFactory.CreateEmptyStyle();
      negativeStyle.BackColor = this.props.Data.NegativeColor;
      negativeStyle.ForeColor = this.props.Data.NegativeColor;

      keyValuePairs = [
        {
          Key: 'Column',
          Value: ColumnHelper.getFriendlyNameFromColumnId(
            this.props.Data.ColumnId,
            this.props.Columns
          ),
        },

        {
          Key: 'Positive Value',
          Value: StringExtensions.IsNullOrEmpty(this.props.Data.PositiveValueColumnId)
            ? this.props.Data!.PositiveValue
            : '[' +
              ColumnHelper.getFriendlyNameFromColumnId(
                this.props.Data.PositiveValueColumnId,
                this.props.Columns
              ) +
              ']',
        },
        {
          Key: 'Positive Colour',
          Value:
            StringExtensions.IsNotNullOrEmpty(this.props.Data!.PositiveValueColumnId) ||
            this.props.Data.PositiveValue ? (
              <StyleVisualItem Style={positiveStyle} />
            ) : null,
        },
        {
          Key: 'Negative Value',
          Value: StringExtensions.IsNullOrEmpty(this.props.Data.NegativeValueColumnId)
            ? this.props.Data!.NegativeValue
            : '[' +
              ColumnHelper.getFriendlyNameFromColumnId(
                this.props.Data.NegativeValueColumnId,
                this.props.Columns
              ) +
              ']',
        },
        {
          Key: 'Negative Colour',
          Value:
            StringExtensions.IsNotNullOrEmpty(this.props.Data!.NegativeValueColumnId) ||
            this.props.Data.NegativeValue ? (
              <StyleVisualItem Style={negativeStyle} />
            ) : null,
        },

        { Key: 'Show Cell Value', Value: this.props.Data.ShowValue ? 'Yes' : 'No' },
        { Key: 'Show Tooltip', Value: this.props.Data.ShowToolTip ? 'Yes' : 'No' },
      ];
    }

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.PercentBarStrategyFriendlyName}
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
