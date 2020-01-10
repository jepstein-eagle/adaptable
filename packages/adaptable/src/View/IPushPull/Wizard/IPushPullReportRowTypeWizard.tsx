import { Report } from '../../../PredefinedConfig/ExportState';
import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';

import { AdaptablePopover } from '../../AdaptablePopover';
import {
  ReportRowScope,
  MessageType,
  ReportColumnScope,
} from '../../../PredefinedConfig/Common/Enums';

import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import WizardPanel from '../../../components/WizardPanel';
import Radio from '../../../components/Radio';
import { Flex } from 'rebass';
import HelpBlock from '../../../components/HelpBlock';
import { IPushPullReport } from '../../../PredefinedConfig/IPushPullState';

export interface IPushPullReportRowTypeWizardProps
  extends AdaptableWizardStepProps<IPushPullReport> {}
export interface IPushPullReportRowsWizardState {
  ReportRowScope: ReportRowScope;
}

export class IPushPullReportRowTypeWizard
  extends React.Component<IPushPullReportRowTypeWizardProps, IPushPullReportRowsWizardState>
  implements AdaptableWizardStep {
  constructor(props: IPushPullReportRowTypeWizardProps) {
    super(props);
    this.state = {
      ReportRowScope: this.props.Data.Report.ReportRowScope as ReportRowScope,
    };
  }
  render() {
    return (
      <WizardPanel>
        <Flex flexDirection="column" padding={2}>
          <HelpBlock marginBottom={1}>
            All rows in the datasource will be included in the report, whether visible or not at
            time of export.
          </HelpBlock>
          <Radio
            value="All"
            checked={this.state.ReportRowScope == ReportRowScope.AllRows}
            onChange={(_, e: any) => this.onScopeSelectChanged(e)}
            marginRight={3}
          >
            All Rows
          </Radio>{' '}
          <HelpBlock marginBottom={1}>
            Only rows that are visible at the time the Report is exported will be included in the
            Export
          </HelpBlock>
          <Radio
            value="Visible"
            checked={this.state.ReportRowScope == ReportRowScope.VisibleRows}
            onChange={(_, e: any) => this.onScopeSelectChanged(e)}
            marginRight={3}
          >
            Visible Rows Only
          </Radio>{' '}
          <HelpBlock marginBottom={1}>
            Only the rows which match the Query (built in next step) will be exported - whether
            visible or not.
          </HelpBlock>
          <Radio
            value="Expression"
            checked={this.state.ReportRowScope == ReportRowScope.ExpressionRows}
            onChange={(_, e: any) => this.onScopeSelectChanged(e)}
            marginRight={3}
          >
            By Query - built by you in next step
          </Radio>{' '}
          {this.props.Data.Report.ReportRowScope == ReportRowScope.SelectedCellRows && (
            <div>
              <HelpBlock marginBottom={1}>
                Only the rows which contain selected cells will be exported
              </HelpBlock>
              <Radio
                value="SelectedCell"
                checked={this.state.ReportRowScope == ReportRowScope.SelectedCellRows}
                onChange={(_, e: any) => this.onScopeSelectChanged(e)}
                marginRight={3}
              >
                Selected Cell Rows
              </Radio>{' '}
            </div>
          )}
          {this.props.Data.Report.ReportRowScope == ReportRowScope.SelectedRows && (
            <div>
              <HelpBlock marginBottom={1}>Only the selected rows will be exported</HelpBlock>
              <Radio
                value="SelectedRow"
                checked={this.state.ReportRowScope == ReportRowScope.SelectedRows}
                onChange={(_, e: any) => this.onScopeSelectChanged(e)}
                marginRight={3}
              >
                Selected Rows
              </Radio>{' '}
            </div>
          )}
        </Flex>
      </WizardPanel>
    );
  }

  private onScopeSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;

    if (e.value == 'All') {
      this.setState(
        {
          ReportRowScope: ReportRowScope.AllRows,
          SelectedColumnValues: [],
        } as IPushPullReportRowsWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else if (e.value == 'Visible') {
      this.setState(
        {
          ReportRowScope: ReportRowScope.VisibleRows,
          SelectedColumnValues: [],
        } as IPushPullReportRowsWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else if (e.value == 'SelectedCell') {
      this.setState(
        {
          ReportRowScope: ReportRowScope.SelectedCellRows,
          SelectedColumnValues: [],
        } as IPushPullReportRowsWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else if (e.value == 'SelectedRow') {
      this.setState(
        {
          ReportRowScope: ReportRowScope.SelectedRows,
          SelectedColumnValues: [],
        } as IPushPullReportRowsWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else {
      this.setState(
        { ReportRowScope: ReportRowScope.ExpressionRows } as IPushPullReportRowsWizardState,
        () => this.props.UpdateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    return (
      this.state.ReportRowScope == ReportRowScope.AllRows ||
      this.state.ReportRowScope == ReportRowScope.VisibleRows ||
      this.state.ReportRowScope == ReportRowScope.SelectedCellRows ||
      this.state.ReportRowScope == ReportRowScope.SelectedRows ||
      this.state.ReportRowScope == ReportRowScope.ExpressionRows
    );
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.Report.ReportRowScope = this.state.ReportRowScope;
    if (
      this.props.Data.Report.Expression == null ||
      this.state.ReportRowScope != ReportRowScope.ExpressionRows
    ) {
      this.props.Data.Report.Expression = ExpressionHelper.CreateEmptyExpression();
    }
  }
  public Back(): void {
    //todo
  }
  public GetIndexStepIncrement() {
    return this.state.ReportRowScope == ReportRowScope.ExpressionRows ? 1 : 2;
  }

  public GetIndexStepDecrement() {
    return this.props.Data.Report.ReportColumnScope == ReportColumnScope.BespokeColumns ? 1 : 2;
  }
}
