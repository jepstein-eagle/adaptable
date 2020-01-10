import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { IPushPullReportSelectReportWizard } from './IPushPullReportSelectReportWizard';
import { IPushPullReportColumnChooserWizard } from './IPushPullReportColumnChooserWizard';
import { IPushPullReportRowTypeWizard } from './IPushPullReportRowTypeWizard';
import { IPushPullReportColumnTypeWizard } from './IPushPullReportColumnTypeWizard';
import { IPushPullReportExpressionWizard } from './IPushPullReportExpressionWizard';
import { IPushPullReportSettingsWizard } from './IPushPullReportSettingsWizard';
import { IPushPullReport, IPushPullDomain } from '../../../PredefinedConfig/IPushPullState';
import { IPushPullReportScheduleWizard } from './IPushPullReportScheduleWizard';
import { IPushPullReportDomainPageSelectorWizard } from './IPushPullReportDomainPageSelectorWizard';
import { IPushPullReportSummaryWizard } from './IPushPullReportSummaryWizard';

export interface IPushPullReportWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<IPushPullReportWizard> {
  IPushPullDomainPages: IPushPullDomain[];
}

export class IPushPullReportWizard extends React.Component<IPushPullReportWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.IPushPullStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Adaptable={this.props.Adaptable}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Select Report',
              Index: 0,
              Element: <IPushPullReportSelectReportWizard />,
            },
            {
              StepName: 'Columns',
              Index: 1,
              Element: <IPushPullReportColumnTypeWizard />,
            },
            {
              StepName: 'Columns',
              Index: 2,
              Element: <IPushPullReportColumnChooserWizard />,
            },
            {
              StepName: 'Rows',
              Index: 3,
              Element: <IPushPullReportRowTypeWizard />,
            },
            {
              StepName: 'Rows',
              Index: 4,
              Element: (
                <IPushPullReportExpressionWizard
                  UserFilters={this.props.UserFilters}
                  SystemFilters={this.props.SystemFilters}
                  NamedFilters={this.props.NamedFilters}
                  ColumnCategories={this.props.ColumnCategories}
                />
              ),
            },
            {
              StepName: 'Settings',
              Index: 5,
              Element: (
                <IPushPullReportSettingsWizard
                  IPushPullReports={this.props.ConfigEntities as IPushPullReport[]}
                />
              ),
            },
            {
              StepName: 'Schedule',
              Index: 6,
              Element: <IPushPullReportScheduleWizard />,
            },
            {
              StepName: 'iPushPull Page',
              Index: 7,
              Element: (
                <IPushPullReportDomainPageSelectorWizard
                  IPushPullDomainsPages={this.props.IPushPullDomainPages}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 8,
              Element: <IPushPullReportSummaryWizard />,
            },
          ]}
          Data={this.props.EditedAdaptableObject as IPushPullReport}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
