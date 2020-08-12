import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { PlusMinusColumnWizard } from './PlusMinusColumnWizard';
import { PlusMinusSettingsWizard } from './PlusMinusSettingsWizard';
import { PlusMinusSummaryWizard } from './PlusMinusSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionWizard } from '../../Components/ExpressionWizard';

export interface PlusMinusWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<PlusMinusWizard> {
  SelectedColumnId: string;
}

export class PlusMinusWizard extends React.Component<PlusMinusWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.PlusMinusStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <PlusMinusColumnWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Settings',
              Index: 1,
              Element: <PlusMinusSettingsWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Query Builder',
              Index: 2,
              Element: (
                <ExpressionWizard
                  Api={this.props.Api}
                  onSetNewSharedQueryName={this.props.onSetNewSharedQueryName}
                  onSetUseSharedQuery={this.props.onSetUseSharedQuery}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <PlusMinusSummaryWizard Api={this.props.Api} />,
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
