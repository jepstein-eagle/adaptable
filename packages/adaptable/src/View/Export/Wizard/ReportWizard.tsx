import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ReportColumnChooserWizard } from './ReportColumnChooserWizard';
import { ReportColumnTypeWizard } from './ReportColumnTypeWizard';
import { ReportExpressionWizard } from './ReportExpressionWizard';
import { ReportSettingsWizard } from './ReportSettingsWizard';
import { ReportSummaryWizard } from './ReportSummaryWizard';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { Report } from '../../../PredefinedConfig/ExportState';
import { ReportRowTypeWizard } from './ReportRowTypeWizard';

export class ReportWizard extends React.Component<
  AdaptableObjectExpressionAdaptableWizardProps<ReportWizard>,
  {}
> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.ExportStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Adaptable={this.props.Adaptable}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <ReportColumnTypeWizard />,
            },
            {
              StepName: 'Select Column',
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
                  NamedFilters={this.props.NamedFilters}
                  ColumnCategories={this.props.ColumnCategories}
                />
              ),
            },
            {
              StepName: 'Settings',
              Index: 4,
              Element: <ReportSettingsWizard Reports={this.props.ConfigEntities as Report[]} />,
            },
            {
              StepName: 'Summary',
              Index: 5,
              Element: <ReportSummaryWizard />,
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
