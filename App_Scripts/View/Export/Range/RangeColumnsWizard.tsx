import { IRange } from '../../../Core/Interface/IExportStrategy';
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
import { RangeScope, SelectionMode, PopoverType } from '../../../Core/Enums';

export interface RangeColumnsWizardProps extends AdaptableWizardStepProps<IRange> {
    Columns: Array<IColumn>
}
export interface RangeColumnsWizardState {
    SelectedColumnValues: string[];
    RangeScope: RangeScope
}

export class RangeColumnsWizard extends React.Component<RangeColumnsWizardProps, RangeColumnsWizardState> implements AdaptableWizardStep {
    constructor(props: RangeColumnsWizardProps) {
        super(props);
        this.state = {
            SelectedColumnValues: this.props.Data.Columns.map(c =>
                this.props.Columns.find(col => col.ColumnId == c).FriendlyName
            )
            , RangeScope: this.props.Data.RangeScope
        }
    }
    render(): any {
        return <Panel header="Select Columns for the Range" bsStyle="primary">
            <Col xs={12} style={radioMarginStyle}>
                <AdaptableBlotterForm inline>
                    <Radio value="All" checked={this.state.RangeScope == RangeScope.AllColumns} onChange={(e) => this.onScopeSelectChanged(e)}>{' '} All Columns </Radio>
                    {' '} <span style={helpButtonStyle} > <AdaptablePopover headerText={"Range: All Columns"} bodyText={["All columns in the your blotter will be included in the Range."]} popoverType={PopoverType.Info} /></span>
                </AdaptableBlotterForm>
            </Col>
            <Col xs={12} style={radioMarginStyle}>
                <AdaptableBlotterForm inline>
                    <Radio value="Selected" checked={this.state.RangeScope == RangeScope.SelectedColumns} onChange={(e) => this.onScopeSelectChanged(e)}> Selected Columns </Radio>
                    {' '} <span style={helpButtonStyle} ><AdaptablePopover headerText={"Range: Selected Columns"} bodyText={["Only the selected columns will be included in the range."]} popoverType={PopoverType.Info} /></span>
                </AdaptableBlotterForm>
            </Col>
            <Col xs={12} style={radioMarginStyle}>
                {this.state.RangeScope == RangeScope.SelectedColumns &&
                     <SingleListBox style={divStyle} Values={this.props.Columns.map(c => c.FriendlyName)}
                UiSelectedValues={this.state.SelectedColumnValues}
                onSelectedChange={(list) => this.onSelectedColumnsChanged(list)}
                SelectionMode={SelectionMode.Multi}>
            </SingleListBox>
                }
            </Col>
        </Panel>
    }

    onSelectedColumnsChanged(selectedColumnValues: Array<string>) {
        this.setState({ SelectedColumnValues: selectedColumnValues } as RangeColumnsWizardState, () => this.props.UpdateGoBackState())
    }

    private onScopeSelectChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.value == "All") {
            this.setState({ RangeScope: RangeScope.AllColumns,  SelectedColumnValues:[] } as RangeColumnsWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ RangeScope: RangeScope.SelectedColumns } as RangeColumnsWizardState, () => this.props.UpdateGoBackState())
        }
    }

    public canNext(): boolean {
        return (this.state.RangeScope == RangeScope.AllColumns ||  this.state.SelectedColumnValues.length > 0);
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.RangeScope = this.state.RangeScope;
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