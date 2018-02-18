/*import { IReport } from '../../../Core/Interface/IExportStrategy';
import * as React from "react";
import { ListGroup, ListGroupItem, Panel, Col, Radio } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { SingleListBox } from '../../SingleListBox'
import { StringExtensions } from '../../../Core/Extensions';
import { ColumnSelector } from '../../ColumnSelector';
import { AdaptableBlotterForm } from '../../AdaptableBlotterForm'
import { AdaptablePopover } from '../../AdaptablePopover';
import { ReportRowScope, SelectionMode, PopoverType } from '../../../Core/Enums';

export interface ReportRowsWizardProps extends AdaptableWizardStepProps<IReport> {
}
export interface ReportRowsWizardState {
     ReportRowScope: ReportRowScope
}

export class ReportRowsWizard extends React.Component<ReportRowsWizardProps, ReportRowsWizardState> implements AdaptableWizardStep {
    constructor(props: ReportRowsWizardProps) {
        super(props);
        this.state = {
            ReportRowScope: this.props.Data.ReportRowScope
        }
    }
    public componentDidMount() {
        // would rather not but only way I can see to force page to show Finish (which is default)
        this.props.UpdateGoBackState(this.state.ReportRowScope != ReportRowScope.ExpressionRows);
    } 

    render(): any {
        return <Panel header="Select Rows for the Report" bsStyle="primary">
            <Col xs={12} style={radioMarginStyle}>
                <AdaptableBlotterForm inline>
                    <Radio value="All" checked={this.state.ReportRowScope == ReportRowScope.AllRows} onChange={(e) => this.onScopeSelectChanged(e)}>{' '}{' '} All Rows </Radio>
                    {' '} <span style={helpButtonStyle} > <AdaptablePopover headerText={"Report: All Rows"} bodyText={["All rows in the datasource will be exported, visible or not."]} popoverType={PopoverType.Info} /></span>
                </AdaptableBlotterForm>
            </Col>
            <Col xs={12} style={radioMarginStyle}>
                <AdaptableBlotterForm inline>
                    <Radio value="Visible" checked={this.state.ReportRowScope == ReportRowScope.VisibleRows} onChange={(e) => this.onScopeSelectChanged(e)}>{' '}{' '} Visible Rows </Radio>
                    {' '} <span style={helpButtonStyle} > <AdaptablePopover headerText={"Report: Visible Rows"} bodyText={["Only rows that are visible at the time the Report is exported will be included in the Export."]} popoverType={PopoverType.Info} /></span>
                </AdaptableBlotterForm>
            </Col>
            <Col xs={12} style={radioMarginStyle}>
                <AdaptableBlotterForm inline>
                    <Radio value="Bespoke" checked={this.state.ReportRowScope == ReportRowScope.ExpressionRows} onChange={(e) => this.onScopeSelectChanged(e)}> {' '}{' '} Query Rows </Radio>
                    {' '} <span style={helpButtonStyle} ><AdaptablePopover headerText={"Report: Query Rows"} bodyText={["Only the rows that pass the query (to be created in next step) will be exported."]} popoverType={PopoverType.Info} /></span>
                </AdaptableBlotterForm>
            </Col>
           
        </Panel>
    }

   
    private onScopeSelectChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;

        if (e.value == "All") {
            this.setState({ ReportRowScope: ReportRowScope.AllRows } as ReportRowsWizardState, () => this.props.UpdateGoBackState(e.value != "Bespoke"))
        } else if (e.value == "Visible") {
            this.setState({ ReportRowScope: ReportRowScope.VisibleRows } as ReportRowsWizardState, () => this.props.UpdateGoBackState(e.value != "Bespoke"))
        } else {
            this.setState({ ReportRowScope: ReportRowScope.ExpressionRows } as ReportRowsWizardState, () => this.props.UpdateGoBackState(e.value != "Bespoke"))
        }
    }

    public canNext(): boolean {
        return  true;
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.ReportRowScope = this.state.ReportRowScope;
    }
    public Back(): void { }
    public StepName = this.props.StepName
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '335px',
    'marginBottom': '0'
}

let radioMarginStyle = {
    margin: '8px'
}

let helpButtonStyle = {
    'marginLeft': '3px'
}
*/