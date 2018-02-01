/*import { IRange } from '../../../Core/Interface/IExportStrategy';
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
import { RangeRowScope, SelectionMode, PopoverType } from '../../../Core/Enums';

export interface RangeRowsWizardProps extends AdaptableWizardStepProps<IRange> {
}
export interface RangeRowsWizardState {
     RangeRowScope: RangeRowScope
}

export class RangeRowsWizard extends React.Component<RangeRowsWizardProps, RangeRowsWizardState> implements AdaptableWizardStep {
    constructor(props: RangeRowsWizardProps) {
        super(props);
        this.state = {
            RangeRowScope: this.props.Data.RangeRowScope
        }
    }
    public componentDidMount() {
        // would rather not but only way I can see to force page to show Finish (which is default)
        this.props.UpdateGoBackState(this.state.RangeRowScope != RangeRowScope.ExpressionRows);
    } 

    render(): any {
        return <Panel header="Select Rows for the Range" bsStyle="primary">
            <Col xs={12} style={radioMarginStyle}>
                <AdaptableBlotterForm inline>
                    <Radio value="All" checked={this.state.RangeRowScope == RangeRowScope.AllRows} onChange={(e) => this.onScopeSelectChanged(e)}>{' '}{' '} All Rows </Radio>
                    {' '} <span style={helpButtonStyle} > <AdaptablePopover headerText={"Range: All Rows"} bodyText={["All rows in the datasource will be exported, visible or not."]} popoverType={PopoverType.Info} /></span>
                </AdaptableBlotterForm>
            </Col>
            <Col xs={12} style={radioMarginStyle}>
                <AdaptableBlotterForm inline>
                    <Radio value="Visible" checked={this.state.RangeRowScope == RangeRowScope.VisibleRows} onChange={(e) => this.onScopeSelectChanged(e)}>{' '}{' '} Visible Rows </Radio>
                    {' '} <span style={helpButtonStyle} > <AdaptablePopover headerText={"Range: Visible Rows"} bodyText={["Only rows that are visible at the time the range is exported will be included in the Export."]} popoverType={PopoverType.Info} /></span>
                </AdaptableBlotterForm>
            </Col>
            <Col xs={12} style={radioMarginStyle}>
                <AdaptableBlotterForm inline>
                    <Radio value="Bespoke" checked={this.state.RangeRowScope == RangeRowScope.ExpressionRows} onChange={(e) => this.onScopeSelectChanged(e)}> {' '}{' '} Query Rows </Radio>
                    {' '} <span style={helpButtonStyle} ><AdaptablePopover headerText={"Range: Query Rows"} bodyText={["Only the rows that pass the query (to be created in next step) will be exported."]} popoverType={PopoverType.Info} /></span>
                </AdaptableBlotterForm>
            </Col>
           
        </Panel>
    }

   
    private onScopeSelectChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;

        if (e.value == "All") {
            this.setState({ RangeRowScope: RangeRowScope.AllRows } as RangeRowsWizardState, () => this.props.UpdateGoBackState(e.value != "Bespoke"))
        } else if (e.value == "Visible") {
            this.setState({ RangeRowScope: RangeRowScope.VisibleRows } as RangeRowsWizardState, () => this.props.UpdateGoBackState(e.value != "Bespoke"))
        } else {
            this.setState({ RangeRowScope: RangeRowScope.ExpressionRows } as RangeRowsWizardState, () => this.props.UpdateGoBackState(e.value != "Bespoke"))
        }
    }

    public canNext(): boolean {
        return  true;
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.RangeRowScope = this.state.RangeRowScope;
    }
    public Back(): void { }
    public StepName = "Select Rows in Range"
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