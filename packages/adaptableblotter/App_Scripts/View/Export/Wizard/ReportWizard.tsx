import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ReportColumnChooserWizard } from './ReportColumnChooserWizard';
import { ReportColumnTypeWizard } from './ReportColumnTypeWizard';
import { ReportExpressionWizard } from './ReportExpressionWizard';
import { ReportSettingsWizard } from './ReportSettingsWizard';
import { ReportSummaryWizard } from './ReportSummaryWizard';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { Report } from '../../../PredefinedConfig/IUserState/ExportState';
import { ReportRowTypeWizard } from './ReportRowTypeWizard';
import { ReportScheduleWizard } from './ReportScheduleWizard';

export class ReportWizard extends React.Component<
  IAdaptableBlotterObjectExpressionAdaptableWizardProps<ReportWizard>,
  {}
> {
  render() {
    return (
      <div className={this.props.cssClassName}>
        <AdaptableWizard
          FriendlyName={StrategyConstants.ExportStrategyName}
          ModalContainer={this.props.ModalContainer}
          cssClassName={this.props.cssClassName}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Column',
              Index: 0,
              Element: <ReportColumnTypeWizard />,
            },
            {
              StepName: 'Column',
              Index: 1,
              Element: <ReportColumnChooserWizard />,
            },
            {
              StepName: 'Rows',
              Index: 2,
              Element: <ReportRowTypeWizard />,
            },
            {
              StepName: 'Rows',
              Index: 3,
              Element: (
                <ReportExpressionWizard
                  UserFilters={this.props.UserFilters}
                  SystemFilters={this.props.SystemFilters}
                />
              ),
            },
            {
              StepName: 'Schedule',
              Index: 4,
              Element: <ReportScheduleWizard />,
            },
            {
              StepName: 'Settings',
              Index: 5,
              Element: <ReportSettingsWizard Reports={this.props.ConfigEntities as Report[]} />,
            },
            {
              StepName: 'Summary',
              Index: 6,
              Element: <ReportSummaryWizard UserFilters={this.props.UserFilters} />,
            },
          ]}
          Data={this.props.EditedAdaptableBlotterObject as Report}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
