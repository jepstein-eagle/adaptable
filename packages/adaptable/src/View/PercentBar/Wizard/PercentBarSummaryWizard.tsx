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
          Value: this.props.Api.gridApi.getFriendlyNameFromColumnId(this.props.Data.ColumnId),
        },

        {
          Key: 'Ranges',
          Value: (
            <Flex>
              {this.props.Data!.Ranges.map((r, i) => (
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
          Value: this.props.Data.BackColor ? (
            <StyleVisualItem
              Style={{
                BackColor: this.props.Data.BackColor,
                ForeColor: this.props.Data.BackColor,
              }}
            />
          ) : (
            'No'
          ),
        },
        { Key: 'Show Cell Value', Value: this.props.Data.ShowValue ? 'Yes' : 'No' },
        { Key: 'Show Tooltip', Value: this.props.Data.ShowToolTip ? 'Yes' : 'No' },
        { Key: 'Display Raw Value', Value: this.props.Data.DisplayRawValue ? 'Yes' : 'No' },
        {
          Key: 'Display Percentage Value',
          Value: this.props.Data.DisplayPercentageValue ? 'Yes' : 'No',
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
