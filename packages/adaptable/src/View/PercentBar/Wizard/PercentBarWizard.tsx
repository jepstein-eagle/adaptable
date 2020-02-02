import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { PercentBarSelectColumnWizard } from '././PercentBarSelectColumnWizard';
import { PercentBarSummaryWizard } from '././PercentBarSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { PercentBarSettingsWizard } from './PercentBarSettingsWizard';
import { PercentBarPositiveValuesWizard } from './PercentBarPositiveValuesWizard';
import { PercentBarNegativeValuesWizard } from './PercentBarNegativeValuesWizard';

export interface PercentBarWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<PercentBarWizard> {
  ColorPalette: Array<string>;
}

export class PercentBarWizard extends React.Component<PercentBarWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.PercentBarStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Adaptable={this.props.Adaptable}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <PercentBarSelectColumnWizard />,
            },
            {
              StepName: 'Positive Values',
              Index: 1,
              Element: <PercentBarPositiveValuesWizard ColorPalette={this.props.ColorPalette} />,
            },
            {
              StepName: 'Negative Values',
              Index: 1,
              Element: <PercentBarNegativeValuesWizard ColorPalette={this.props.ColorPalette} />,
            },
            {
              StepName: 'Settings',
              Index: 2,
              Element: <PercentBarSettingsWizard />,
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <PercentBarSummaryWizard />,
            },
          ]}
          Data={this.props.EditedAdaptableObject}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
