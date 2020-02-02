import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableStyle } from '../../../PredefinedConfig/Common/AdaptableStyle';
import { GradientColumn } from '../../../PredefinedConfig/GradientColumnState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { StyleVisualItem } from '../../Components/StyleVisualItem';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

export interface GradientColumnSummaryWizardProps
  extends AdaptableWizardStepProps<GradientColumn> {}

export class GradientColumnSummaryWizard
  extends React.Component<GradientColumnSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: GradientColumnSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let positiveStyle: AdaptableStyle = ObjectFactory.CreateEmptyStyle();
    positiveStyle.BackColor = this.props.Data.PositiveColor;
    positiveStyle.ForeColor = this.props.Data.PositiveColor;
    let negativeStyle: AdaptableStyle = ObjectFactory.CreateEmptyStyle();
    negativeStyle.BackColor = this.props.Data.NegativeColor;
    negativeStyle.ForeColor = this.props.Data.NegativeColor;

    let keyValuePairs: KeyValuePair[] = [
      {
        Key: 'Column',
        Value: ColumnHelper.getFriendlyNameFromColumnId(
          this.props.Data.ColumnId,
          this.props.Columns
        ),
      },
      {
        Key: 'Base Value',
        Value: this.props.Data.BaseValue,
      },
      {
        Key: 'Positive Value',
        Value: this.props.Data.PositiveValue,
      },

      {
        Key: 'Positive Colour',
        Value: this.props.Data.PositiveValue ? <StyleVisualItem Style={positiveStyle} /> : null,
      },
      {
        Key: 'Negative Value',
        Value: this.props.Data.NegativeValue,
      },

      {
        Key: 'Negative Colour',
        Value: this.props.Data.NegativeValue ? <StyleVisualItem Style={negativeStyle} /> : null,
      },
    ];

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.GradientColumnStrategyFriendlyName}
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
