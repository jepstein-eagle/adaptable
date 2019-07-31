import * as React from 'react';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { FreeTextColumnSettingsWizard } from './FreeTextColumnSettingsWizard';
import { FreeTextColumnSummaryWizard } from './FreeTextColumnSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface FreeTextColumnWizardProps
  extends AdaptableBlotterObjectExpressionAdaptableWizardProps<FreeTextColumnWizard> {}

export class FreeTextColumnWizard extends React.Component<FreeTextColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.FreeTextColumnStrategyName}
          ModalContainer={this.props.ModalContainer}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Settings',
              Index: 0,
              Element: <FreeTextColumnSettingsWizard />,
            },
            {
              StepName: 'Summary',
              Index: 1,
              Element: <FreeTextColumnSummaryWizard />,
            },
          ]}
          Data={this.props.EditedAdaptableBlotterObject}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
