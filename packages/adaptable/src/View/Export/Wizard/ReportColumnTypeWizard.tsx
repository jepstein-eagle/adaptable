import { Report } from '../../../PredefinedConfig/ExportState';
import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
//import { AdaptableWizard } from './../../../Wizard/AdaptableWizard'

import { AdaptablePopover } from '../../AdaptablePopover';
import { ReportColumnScope, MessageType } from '../../../PredefinedConfig/Common/Enums';

import WizardPanel from '../../../components/WizardPanel';
import Radio from '../../../components/Radio';
import { Flex } from 'rebass';
import HelpBlock from '../../../components/HelpBlock';

export interface ReportColumnTypeWizardProps extends AdaptableWizardStepProps<Report> {}
export interface ReportColumnsWizardState {
  ReportColumnScope: ReportColumnScope;
}

export class ReportColumnTypeWizard
  extends React.Component<ReportColumnTypeWizardProps, ReportColumnsWizardState>
  implements AdaptableWizardStep {
  constructor(props: ReportColumnTypeWizardProps) {
    super(props);
    this.state = {
      ReportColumnScope: this.props.Data.ReportColumnScope as ReportColumnScope,
    };
  }
  render() {
    return (
      <WizardPanel>
        <Flex flexDirection="column" padding={2}>
          <HelpBlock marginBottom={1}>
            All columns in the datasource will be included in the report, whether visible or not at
            time of export
          </HelpBlock>
          <Radio
            value="All"
            checked={this.state.ReportColumnScope == ReportColumnScope.AllColumns}
            onChange={(_, e: any) => this.onScopeSelectChanged(e)}
            marginRight={3}
          >
            All Columns
          </Radio>{' '}
          <HelpBlock marginBottom={1}>
            Only columns that are visible at the time the Report is exported will be included
          </HelpBlock>
          <Radio
            value="Visible"
            checked={this.state.ReportColumnScope == ReportColumnScope.VisibleColumns}
            onChange={(_, e: any) => this.onScopeSelectChanged(e)}
            marginRight={3}
          >
            Visible Columns Only
          </Radio>{' '}
          <HelpBlock marginBottom={1}>
            Only selected columns (which you will choose in the next step) will be exported -
            whether visible or not
          </HelpBlock>
          <Radio
            value="Bespoke"
            marginRight={3}
            checked={this.state.ReportColumnScope == ReportColumnScope.BespokeColumns}
            onChange={(_, e: any) => this.onScopeSelectChanged(e)}
          >
            Bespoke Columns
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
          ReportColumnScope: ReportColumnScope.AllColumns,
          SelectedColumnValues: [],
        } as ReportColumnsWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else if (e.value == 'Visible') {
      this.setState(
        {
          ReportColumnScope: ReportColumnScope.VisibleColumns,
          SelectedColumnValues: [],
        } as ReportColumnsWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else {
      this.setState(
        { ReportColumnScope: ReportColumnScope.BespokeColumns } as ReportColumnsWizardState,
        () => this.props.UpdateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    return (
      this.state.ReportColumnScope == ReportColumnScope.AllColumns ||
      this.state.ReportColumnScope == ReportColumnScope.VisibleColumns ||
      this.state.ReportColumnScope == ReportColumnScope.BespokeColumns
    );
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ReportColumnScope = this.state.ReportColumnScope;
    if (this.state.ReportColumnScope != ReportColumnScope.BespokeColumns) {
      this.props.Data.ColumnIds = [];
    }
  }
  public Back(): void {
    //todo
  }
  public GetIndexStepIncrement() {
    return this.state.ReportColumnScope == ReportColumnScope.BespokeColumns ? 1 : 2;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
