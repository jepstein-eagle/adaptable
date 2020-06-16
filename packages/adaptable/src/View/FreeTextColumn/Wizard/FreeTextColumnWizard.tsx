import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { FreeTextColumnSettingsWizard } from './FreeTextColumnSettingsWizard';
import { FreeTextColumnSummaryWizard } from './FreeTextColumnSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface FreeTextColumnWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<FreeTextColumnWizard> {}

export class FreeTextColumnWizard extends React.Component<FreeTextColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.FreeTextColumnStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Settings',
              Index: 0,
              Element: <FreeTextColumnSettingsWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Summary',
              Index: 1,
              Element: <FreeTextColumnSummaryWizard Api={this.props.Api} />,
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
