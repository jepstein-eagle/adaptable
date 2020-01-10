import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { Flex } from 'rebass';
import WizardPanel from '../../../components/WizardPanel';
import Radio from '../../../components/Radio';
import { SyntheticEvent } from 'react';
import HelpBlock from '../../../components/HelpBlock';
import { IPushPullReport } from '../../../PredefinedConfig/IPushPullState';
import { EMPTY_STRING } from '../../../Utilities/Constants/GeneralConstants';
import { Report } from '../../../PredefinedConfig/ExportState';
import StringExtensions from '../../../Utilities/Extensions/StringExtensions';
import Dropdown from '../../../components/Dropdown';
import { createUuid } from '../../../PredefinedConfig/Uuid';

export interface IPushPullReportSelectReportWizardProps
  extends AdaptableWizardStepProps<IPushPullReport> {}
export interface IPushPullReportSelectReportWizardState {
  useExistingReport: boolean;
  existingReport: Report;
}

export class IPushPullReportSelectReportWizard
  extends React.Component<
    IPushPullReportSelectReportWizardProps,
    IPushPullReportSelectReportWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: IPushPullReportSelectReportWizardProps) {
    super(props);
    this.state = {
      useExistingReport: this.props.Data.Report.Name === EMPTY_STRING,
      existingReport: this.props.Data.Report,
    };
  }

  render(): any {
    let allReports: Report[] = this.props.Adaptable.api.exportApi.getAllReports();
    let availableReports: any[] = allReports.map(report => {
      return {
        label: report.Name,
        value: report.Name,
      };
    });
    return (
      <WizardPanel>
        <Flex flexDirection="column" padding={2}>
          <HelpBlock>Create a Bespoke Report (using next steps in Wizard))</HelpBlock>
          <Radio
            value={'New'}
            marginRight={3}
            marginBottom={3}
            checked={this.state.useExistingReport == false}
            onChange={(_: boolean, e: SyntheticEvent) => this.onUseExistingReportChanged(e)}
          >
            Bespoke Report
          </Radio>{' '}
          <HelpBlock>
            Base on existing Report - you will add a new name and iPushPull page
          </HelpBlock>
          <Radio
            marginRight={3}
            value={'Existing'}
            checked={this.state.useExistingReport == true}
            onChange={(_: boolean, e: SyntheticEvent) => this.onUseExistingReportChanged(e)}
          >
            Use Existing Report
          </Radio>{' '}
        </Flex>

        {/* If use existing report then lets get it */}
        <Flex flexDirection="column" marginTop={1} marginLeft={2} marginRight={2}>
          {this.state.useExistingReport === true ? (
            <Flex alignItems="stretch" className="ab-DashboardToolbar__Export__wrap">
              <Dropdown
                disabled={allReports.length == 0}
                style={{ minWidth: 160 }}
                options={availableReports}
                className="ab-DashboardToolbar__Export__select"
                placeholder="Select Report"
                onChange={(reportName: string) => this.onSelectedReportChanged(reportName)}
                value={this.state.existingReport ? this.state.existingReport.Name : null}
                showClearButton
                marginRight={2}
              ></Dropdown>
            </Flex>
          ) : null}
        </Flex>
      </WizardPanel>
    );
  }

  private onSelectedReportChanged(reportName: string) {
    if (StringExtensions.IsNullOrEmpty(reportName) || reportName === 'Select Report') {
      this.setState(
        { existingReport: this.props.Data.Report } as IPushPullReportSelectReportWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else {
      let selectedReport: Report = this.props.Adaptable.api.exportApi.getReportByName(reportName);
      if (selectedReport) {
        this.setState(
          { existingReport: selectedReport } as IPushPullReportSelectReportWizardState,
          () => this.props.UpdateGoBackState()
        );
      }
    }
  }

  private onUseExistingReportChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      { useExistingReport: e.value === 'Existing' } as IPushPullReportSelectReportWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (this.state.useExistingReport) {
      if (StringExtensions.IsNullOrEmpty(this.state.existingReport.Name)) {
        return false;
      }
    }
    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    if (this.state.useExistingReport) {
      let newReport: Report = {
        Uuid: createUuid(),
        Name: EMPTY_STRING,
        Expression: this.state.existingReport.Expression,
        ColumnIds: this.state.existingReport.ColumnIds,
        ReportColumnScope: this.state.existingReport.ReportColumnScope,
        ReportRowScope: this.state.existingReport.ReportRowScope,
        AutoExport: this.state.existingReport.AutoExport
          ? {
              Schedule: this.state.existingReport.AutoExport.Schedule,
              ExportDestination: 'iPushPull',
            }
          : undefined,
      };

      this.props.Data.Report = newReport;
    }
  }

  public Back(): void {
    //
  }

  public GetIndexStepIncrement() {
    return this.state.useExistingReport ? 5 : 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
