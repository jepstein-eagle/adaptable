import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ReportScopeWizard } from './ReportScopeWizard';
import { ReportColumnTypeWizard } from './ReportColumnTypeWizard';
import { ReportSummaryWizard } from './ReportSummaryWizard';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { Report } from '../../../PredefinedConfig/ExportState';
import { ReportRowTypeWizard } from './ReportRowTypeWizard';
import { ExpressionWizard } from '../../Components/ExpressionWizard';
import { ReportSettingsWizard } from './ReportSettingsWizard';

export interface ReportWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<ReportWizard> {}

export class ReportWizard extends React.Component<ReportWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          friendlyName={StrategyConstants.ExportStrategyFriendlyName}
          modalContainer={this.props.modalContainer}
          api={this.props.api}
          steps={[
            {
              StepName: 'Columns',
              Index: 0,
              Element: <ReportColumnTypeWizard api={this.props.api} />,
            },
            {
              StepName: 'Columns',
              Index: 1,
              Element: <ReportScopeWizard api={this.props.api} />,
            },
            {
              StepName: 'Rows',
              Index: 2,
              Element: <ReportRowTypeWizard api={this.props.api} />,
            },
            {
              StepName: 'Rows',
              Index: 3,
              Element: (
                <ExpressionWizard
                  api={this.props.api}
                  onSetNewSharedQueryName={this.props.onSetNewSharedQueryName}
                  onSetUseSharedQuery={this.props.onSetUseSharedQuery}
                />
              ),
            },
            {
              StepName: 'Settings',
              Index: 4,
              Element: (
                <ReportSettingsWizard
                  Reports={this.props.configEntities as Report[]}
                  api={this.props.api}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 5,
              Element: <ReportSummaryWizard api={this.props.api} />,
            },
          ]}
          data={this.props.editedAdaptableObject as Report}
          stepStartIndex={this.props.wizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
