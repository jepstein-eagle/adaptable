import { IReport } from '../../../Utilities/Interface/BlotterObjects/IReport';
import * as React from 'react';
import { Col, Radio, ControlLabel } from 'react-bootstrap';
import Panel from '../../../components/Panel';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
//import { AdaptableWizard } from './../../../Wizard/AdaptableWizard'
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptablePopover } from '../../AdaptablePopover';
import { ReportRowScope, MessageType, ReportColumnScope } from '../../../Utilities/Enums';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';

export interface ReportRowTypeWizardProps extends AdaptableWizardStepProps<IReport> {}
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
    let cssClassName: string = this.props.cssClassName + '-ReportRows';
    return (
      <div className={cssClassName}>
        <Panel
          header="Select Rows for the Report"
          bsStyle="primary"
          borderRadius="none"
          bodyProps={{ style: { border: 'none' } }}
          headerProps={{ style: { border: 'none' } }}
        >
          <Col xs={12} className="ab_large_margin">
            <AdaptableBlotterForm inline>
              <Radio
                value="All"
                checked={this.state.ReportRowScope == ReportRowScope.AllRows}
                onChange={e => this.onScopeSelectChanged(e)}
              >
                {' '}
                All Rows in the Data Source
              </Radio>{' '}
              <AdaptablePopover
                cssClassName={cssClassName}
                headerText={'Report: All Rows'}
                bodyText={[
                  'All rows in the datasource will be included in the report, whether visible or not at time of export.',
                ]}
              />
            </AdaptableBlotterForm>
          </Col>
          <Col xs={12} className="ab_large_margin">
            <AdaptableBlotterForm inline>
              <Radio
                value="Visible"
                checked={this.state.ReportRowScope == ReportRowScope.VisibleRows}
                onChange={e => this.onScopeSelectChanged(e)}
              >
                {' '}
                Visible Rows Only (at time that report is run)
              </Radio>{' '}
              <AdaptablePopover
                cssClassName={cssClassName}
                headerText={'Report: Visible Rows'}
                bodyText={[
                  'Only rows that are visible at the time the Report is exported will be included in the Export.',
                ]}
              />
            </AdaptableBlotterForm>
          </Col>
          <Col xs={12} className="ab_large_margin">
            <AdaptableBlotterForm inline>
              <Radio
                value="Expression"
                checked={this.state.ReportRowScope == ReportRowScope.ExpressionRows}
                onChange={e => this.onScopeSelectChanged(e)}
              >
                {' '}
                By Query - built by you in next step
              </Radio>{' '}
              <AdaptablePopover
                cssClassName={cssClassName}
                headerText={'Report: Bespoke Rows'}
                bodyText={[
                  'Only the rows which match the query will be exported (visible or not).',
                ]}
              />
            </AdaptableBlotterForm>
          </Col>
        </Panel>
      </div>
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
    if (this.state.ReportRowScope != ReportRowScope.ExpressionRows) {
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
