import { Report } from '../../../PredefinedConfig/RunTimeState/ExportState';
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
        <Flex flexDirection="row" alignItems="center">
          <Radio
            value="All"
            checked={this.state.ReportRowScope == ReportRowScope.AllRows}
            onChange={(_, e: any) => this.onScopeSelectChanged(e)}
            marginRight={3}
          >
            All Rows in the Data Source
          </Radio>{' '}
          <AdaptablePopover
            headerText={'Report: All Rows'}
            bodyText={[
              'All rows in the datasource will be included in the report, whether visible or not at time of export.',
            ]}
          />
        </Flex>
        <Flex flexDirection="row" alignItems="center" marginTop={3}>
          <Radio
            value="Visible"
            checked={this.state.ReportRowScope == ReportRowScope.VisibleRows}
            onChange={(_, e: any) => this.onScopeSelectChanged(e)}
            marginRight={3}
          >
            Visible Rows Only (at time that report is run)
          </Radio>{' '}
          <AdaptablePopover
            headerText={'Report: Visible Rows'}
            bodyText={[
              'Only rows that are visible at the time the Report is exported will be included in the Export.',
            ]}
          />
        </Flex>
        <Flex flexDirection="row" alignItems="center" marginTop={3}>
          <Radio
            value="Expression"
            checked={this.state.ReportRowScope == ReportRowScope.ExpressionRows}
            onChange={(_, e: any) => this.onScopeSelectChanged(e)}
            marginRight={3}
          >
            By Query - built by you in next step
          </Radio>{' '}
          <AdaptablePopover
            headerText={'Report: Bespoke Rows'}
            bodyText={['Only the rows which match the query will be exported (visible or not).']}
          />
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
      this.props.Data.Expression == null ||
      this.state.ReportRowScope != ReportRowScope.ExpressionRows
    ) {
      this.props.Data.Expression = ExpressionHelper.CreateEmptyExpression();
    }
  }
  public Back(): void {
    //todo
  }
  public GetIndexStepIncrement() {
    return this.state.ReportRowScope == ReportRowScope.ExpressionRows ? 1 : 2;
  }

  public GetIndexStepDecrement() {
    return this.props.Data.ReportColumnScope == ReportColumnScope.BespokeColumns ? 1 : 2;
  }
}
