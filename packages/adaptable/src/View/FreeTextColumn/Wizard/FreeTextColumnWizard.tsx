import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { FreeTextColumnSettingsWizard } from './FreeTextColumnSettingsWizard';
import { FreeTextColumnSummaryWizard } from './FreeTextColumnSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface FreeTextColumnWizardProps
  extends AdaptableObjectAdaptableWizardProps<FreeTextColumnWizard> {}

export class FreeTextColumnWizard extends React.Component<FreeTextColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.FreeTextColumnStrategyFriendlyName}
          ModalContainer={this.props.modalContainer}
          Api={this.props.api}
          Steps={[
            {
              StepName: 'Settings',
              Index: 0,
              Element: <FreeTextColumnSettingsWizard api={this.props.api} />,
            },
            {
              StepName: 'Summary',
              Index: 1,
              Element: <FreeTextColumnSummaryWizard api={this.props.api} />,
            },
          ]}
          Data={this.props.editedAdaptableObject}
          StepStartIndex={this.props.wizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
