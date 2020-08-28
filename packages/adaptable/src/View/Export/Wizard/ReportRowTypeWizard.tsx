import { Report } from '../../../PredefinedConfig/ExportState';
import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';

import { ReportRowScope, ReportColumnScope } from '../../../PredefinedConfig/Common/Enums';

import WizardPanel from '../../../components/WizardPanel';
import Radio from '../../../components/Radio';
import { Flex } from 'rebass';
import HelpBlock from '../../../components/HelpBlock';
import { EMPTY_STRING } from '../../../Utilities/Constants/GeneralConstants';
import StringExtensions from '../../../Utilities/Extensions/StringExtensions';

export interface ReportRowTypeWizardProps extends AdaptableWizardStepProps<Report> {}
export interface ReportRowsWizardState {
  ReportRowScope: ReportRowScope;
}

export class ReportRowTypeWizard
  extends React.Component<ReportRowTypeWizardProps, ReportRowsWizardState>
  implements AdaptableWizardStep {
  constructor(props: ReportRowTypeWizardProps) {
    super(props);
    this.state = {
      ReportRowScope: this.props.Data.ReportRowScope as ReportRowScope,
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
        } as ReportRowsWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else if (e.value == 'Visible') {
      this.setState(
        {
          ReportRowScope: ReportRowScope.VisibleRows,
          SelectedColumnValues: [],
        } as ReportRowsWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else {
      this.setState(
        { ReportRowScope: ReportRowScope.ExpressionRows } as ReportRowsWizardState,
        () => this.props.UpdateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    return (
      this.state.ReportRowScope == ReportRowScope.AllRows ||
      this.state.ReportRowScope == ReportRowScope.VisibleRows ||
      this.state.ReportRowScope == ReportRowScope.ExpressionRows
    );
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ReportRowScope = this.state.ReportRowScope;
    if (
      StringExtensions.IsNullOrEmpty(this.props.Data.Expression) &&
      StringExtensions.IsNullOrEmpty(this.props.Data.SharedQueryId) &&
      this.state.ReportRowScope != ReportRowScope.ExpressionRows
    ) {
      this.props.Data.Expression = EMPTY_STRING;
      this.props.Data.SharedQueryId = EMPTY_STRING;
    }
  }
  public Back(): void {
    //todo
  }
  public GetIndexStepIncrement() {
    return this.state.ReportRowScope == ReportRowScope.ExpressionRows ? 1 : 2;
  }

  public GetIndexStepDecrement() {
    return this.props.Data.ReportColumnScope == ReportColumnScope.ScopeColumns ? 1 : 2;
  }
}
