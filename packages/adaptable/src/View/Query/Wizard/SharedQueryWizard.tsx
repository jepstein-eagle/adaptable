import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { SharedQueryExpressionWizard } from './SharedQueryExpressionWizard';
import { SharedQuerySettingsWizard } from './SharedQuerySettingsWizard';
import { SharedQuerySummaryWizard } from './SharedQuerySummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface SharedQueryWizardProps
  extends AdaptableObjectAdaptableWizardProps<SharedQueryWizard> {}

export class SharedQueryWizard extends React.Component<SharedQueryWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.QueryStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Expression',
              Index: 0,
              Element: <SharedQueryExpressionWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Settings',
              Index: 1,
              Element: <SharedQuerySettingsWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <SharedQuerySummaryWizard Api={this.props.Api} />,
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
