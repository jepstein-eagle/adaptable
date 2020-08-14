import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ReportColumnChooserWizard } from './ReportColumnChooserWizard';
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
          FriendlyName={StrategyConstants.ExportStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Columns',
              Index: 0,
              Element: <ReportColumnTypeWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Columns',
              Index: 1,
              Element: <ReportColumnChooserWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Rows',
              Index: 2,
              Element: <ReportRowTypeWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Rows',
              Index: 3,
              Element: (
                <ExpressionWizard
                  Api={this.props.Api}
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
                  Reports={this.props.ConfigEntities as Report[]}
                  Api={this.props.Api}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 5,
              Element: <ReportSummaryWizard Api={this.props.Api} />,
            },
          ]}
          Data={this.props.EditedAdaptableObject as Report}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
