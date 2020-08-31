import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableStyle } from '../../../PredefinedConfig/Common/AdaptableStyle';
import { GradientColumn } from '../../../PredefinedConfig/GradientColumnState';
import { StyleVisualItem } from '../../Components/StyleVisualItem';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';

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
    positiveStyle.BackColor = this.props.data.PositiveColor;
    positiveStyle.ForeColor = this.props.data.PositiveColor;
    let negativeStyle: AdaptableStyle = ObjectFactory.CreateEmptyStyle();
    negativeStyle.BackColor = this.props.data.NegativeColor;
    negativeStyle.ForeColor = this.props.data.NegativeColor;

    let keyValuePairs: KeyValuePair[] = [
      {
        Key: 'Column',
        Value: this.props.api.columnApi.getFriendlyNameFromColumnId(this.props.data.ColumnId),
      },
      {
        Key: 'Base Value',
        Value: this.props.data.BaseValue,
      },
      {
        Key: 'Positive Value',
        Value: this.props.data.PositiveValue,
      },

      {
        Key: 'Positive Colour',
        Value: this.props.data.PositiveValue ? <StyleVisualItem Style={positiveStyle} /> : null,
      },
      {
        Key: 'Negative Value',
        Value: this.props.data.NegativeValue,
      },

      {
        Key: 'Negative Colour',
        Value: this.props.data.NegativeValue ? <StyleVisualItem Style={negativeStyle} /> : null,
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.GradientColumnStrategyFriendlyName}
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
    /* no implementation */
  }

  public back(): void {
    /* no implementation */
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
