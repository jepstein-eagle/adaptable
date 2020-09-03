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
          friendlyName={StrategyConstants.QueryStrategyFriendlyName}
          modalContainer={this.props.modalContainer}
          api={this.props.api}
          steps={[
            {
              StepName: 'Expression',
              Index: 0,
              Element: <SharedQueryExpressionWizard api={this.props.api} />,
            },
            {
              StepName: 'Settings',
              Index: 1,
              Element: <SharedQuerySettingsWizard api={this.props.api} />,
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <SharedQuerySummaryWizard api={this.props.api} />,
            },
          ]}
          data={this.props.editedAdaptableObject}
          stepStartIndex={this.props.wizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
