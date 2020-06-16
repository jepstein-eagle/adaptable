import * as React from 'react';
import { AdaptableWizard } from '@adaptabletools/adaptable/src/View/Wizard/AdaptableWizard';
import { SparklineColumnSelectColumnWizard } from './SparklineColumnSelectColumnWizard';
import { SparklineColumnSummaryWizard } from './SparklineColumnSummaryWizard';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklineColumnSettingsWizard } from './SparklineColumnSettingsWizard';

export interface SparklineColumnWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<SparklineColumnWizard> {
  ColorPalette: Array<string>;
}

export class SparklineColumnWizard extends React.Component<SparklineColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.SparklineColumnStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <SparklineColumnSelectColumnWizard />,
            },
            {
              StepName: 'Sparkline Settings',
              Index: 1,
              Element: <SparklineColumnSettingsWizard Api={this.props.api} />,
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <SparklineColumnSummaryWizard />,
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
