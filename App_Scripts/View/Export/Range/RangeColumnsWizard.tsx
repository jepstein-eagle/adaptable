import { IRange } from '../../../Core/Interface/IExportStrategy';
import * as React from "react";
import { ListGroup, ListGroupItem, Panel, Col, Radio, ControlLabel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { DualListBoxEditor } from './../../DualListBoxEditor'
import { StringExtensions } from '../../../Core/Extensions';
import { ColumnSelector } from '../../ColumnSelector';
import { AdaptableBlotterForm } from '../../AdaptableBlotterForm'
import { AdaptablePopover } from '../../AdaptablePopover';
import { RangeColumnScope, SelectionMode, PopoverType } from '../../../Core/Enums';

export interface RangeColumnsWizardProps extends AdaptableWizardStepProps<IRange> {
    Columns: Array<IColumn>
}
export interface RangeColumnsWizardState {
    AllColumnValues: string[];
    SelectedColumnValues: string[];
    RangeColumnScope: RangeColumnScope
}

export class RangeColumnsWizard extends React.Component<RangeColumnsWizardProps, RangeColumnsWizardState> implements AdaptableWizardStep {
    constructor(props: RangeColumnsWizardProps) {
        super(props);
        this.state = {
            AllColumnValues: this.props.Columns.map(c => c.FriendlyName),
            SelectedColumnValues: this.props.Data.Columns.map(c =>
                this.props.Columns.find(col => col.ColumnId == c).FriendlyName),
            RangeColumnScope: this.props.Data.RangeColumnScope
        }
    }
    render() {
        return <div>
            <Panel header="Select Columns for the Range" bsStyle="primary">
                <Col xs={2} style={radioMarginStyle}>
                    <ControlLabel>Columns:</ControlLabel>
                </Col>
                <Col xs={2} style={radioMarginStyle}>
                    <AdaptableBlotterForm inline>
                        <Radio value="All" checked={this.state.RangeColumnScope == RangeColumnScope.AllColumns} onChange={(e) => this.onScopeSelectChanged(e)}>{' '}{' '} All </Radio>
                        {' '} <span style={helpButtonStyle} > <AdaptablePopover headerText={"Range: All Columns"} bodyText={["All columns in the datasource will be exported, visible or not."]} popoverType={PopoverType.Info} /></span>
                    </AdaptableBlotterForm>
                </Col>
                <Col xs={3} style={radioMarginStyle}>
                    <AdaptableBlotterForm inline>
                        <Radio value="Visible" checked={this.state.RangeColumnScope == RangeColumnScope.VisibleColumns} onChange={(e) => this.onScopeSelectChanged(e)}>{' '}{' '} Visible </Radio>
                        {' '} <span style={helpButtonStyle} > <AdaptablePopover headerText={"Range: Visible Columns"} bodyText={["Only columns that are visible at the time the range is exported will be included in the Export."]} popoverType={PopoverType.Info} /></span>
                    </AdaptableBlotterForm>
                </Col>
                <Col xs={3} style={radioMarginStyle}>
                    <AdaptableBlotterForm inline>
                        <Radio value="Bespoke" checked={this.state.RangeColumnScope == RangeColumnScope.BespokeColumns} onChange={(e) => this.onScopeSelectChanged(e)}> {' '}{' '}Bespoke </Radio>
                        {' '} <span style={helpButtonStyle} ><AdaptablePopover headerText={"Range: Bespoke Columns"} bodyText={["Only the columns chosen below will be exported (visible or not)."]} popoverType={PopoverType.Info} /></span>
                    </AdaptableBlotterForm>
                </Col>
            </Panel>
            {this.state.RangeColumnScope == RangeColumnScope.BespokeColumns &&
                <Panel>
                    <DualListBoxEditor AvailableValues={this.state.AllColumnValues}
                        SelectedValues={this.state.SelectedColumnValues}
                        HeaderAvailable="Columns"
                        HeaderSelected="Columns in Range"
                        onChange={(SelectedValues) => this.OnSelectedValuesChange(SelectedValues)}></DualListBoxEditor>
                </Panel>
            }
        </div>
    }



    OnSelectedValuesChange(newValues: Array<string>) {
        this.setState({ SelectedColumnValues: newValues } as RangeColumnsWizardState, () => this.props.UpdateGoBackState())
    }

    private onScopeSelectChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;

        if (e.value == "All") {
            this.setState({ RangeColumnScope: RangeColumnScope.AllColumns, SelectedColumnValues: [] } as RangeColumnsWizardState, () => this.props.UpdateGoBackState())
        } else if (e.value == "Visible") {
            this.setState({ RangeColumnScope: RangeColumnScope.VisibleColumns, SelectedColumnValues: [] } as RangeColumnsWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ RangeColumnScope: RangeColumnScope.BespokeColumns } as RangeColumnsWizardState, () => this.props.UpdateGoBackState())
        }
    }

    public canNext(): boolean {
        return (this.state.RangeColumnScope == RangeColumnScope.AllColumns ||
            this.state.RangeColumnScope == RangeColumnScope.VisibleColumns ||
            this.state.SelectedColumnValues.length > 0);
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.RangeColumnScope = this.state.RangeColumnScope;
        this.props.Data.Columns = this.state.SelectedColumnValues.map(c =>
            this.props.Columns.find(col => col.FriendlyName == c).ColumnId)
    }
    public Back(): void { }
    public StepName = "Select Columns in Range"
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '335px',
    'marginBottom': '0'
}

let radioMarginStyle = {
    margin: '5px'
}

let helpButtonStyle = {
    'marginLeft': '3px'
}

