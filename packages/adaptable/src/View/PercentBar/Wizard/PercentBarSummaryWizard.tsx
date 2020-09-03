import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableStyle } from '../../../PredefinedConfig/Common/AdaptableStyle';
import { PercentBar } from '../../../PredefinedConfig/PercentBarState';
import { StyleVisualItem } from '../../Components/StyleVisualItem';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { Flex, Box } from 'rebass';

export interface PercentBarSummaryWizardProps extends AdaptableWizardStepProps<PercentBar> {}

export class PercentBarSummaryWizard extends React.Component<PercentBarSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: PercentBarSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let keyValuePairs: KeyValuePair[] = [];
    if (this.props.data) {
      let positiveStyle: AdaptableStyle = ObjectFactory.CreateEmptyStyle();
      positiveStyle.BackColor = this.props.data.PositiveColor;
      positiveStyle.ForeColor = this.props.data.PositiveColor;
      let negativeStyle: AdaptableStyle = ObjectFactory.CreateEmptyStyle();
      negativeStyle.BackColor = this.props.data.NegativeColor;
      negativeStyle.ForeColor = this.props.data.NegativeColor;

      keyValuePairs = [
        {
          Key: 'Column',
          Value: this.props.api.columnApi.getFriendlyNameFromColumnId(this.props.data.ColumnId),
        },

        {
          Key: 'Ranges',
          Value: (
            <Flex>
              {this.props.data!.Ranges.map((r, i) => (
                <Flex key={i} alignItems="center" mr={3}>
                  <Box mr={1}>
                    {r.Min} to {r.Max}{' '}
                  </Box>
                  <StyleVisualItem
                    Style={{
                      BackColor: r.Color,
                      ForeColor: r.Color,
                    }}
                  />
                </Flex>
              ))}
            </Flex>
          ),
        },
        {
          Key: 'Back Color',
          Value: this.props.data.BackColor ? (
            <StyleVisualItem
              Style={{
                BackColor: this.props.data.BackColor,
                ForeColor: this.props.data.BackColor,
              }}
            />
          ) : (
            'No'
          ),
        },
        { Key: 'Show Cell Value', Value: this.props.data.ShowValue ? 'Yes' : 'No' },
        { Key: 'Show Tooltip', Value: this.props.data.ShowToolTip ? 'Yes' : 'No' },
        { Key: 'Display Raw Value', Value: this.props.data.DisplayRawValue ? 'Yes' : 'No' },
        {
          Key: 'Display Percentage Value',
          Value: this.props.data.DisplayPercentageValue ? 'Yes' : 'No',
        },
      ];
    }

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.PercentBarStrategyFriendlyName}
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
