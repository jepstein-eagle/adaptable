/*
import * as React from "react";
import { ControlLabel, Button, Form, Col, Panel, ListGroup, Row, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';
import { IColumn, IRawValueDisplayValuePair } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { DualListBoxEditor } from './../../DualListBoxEditor'
import { IRange } from '../../../Core/Interface/IExportStrategy';
import { DataType, DistinctCriteriaPairValue, RangeColumnScope } from '../../../Core/Enums';
import { PanelWithInfo } from '../../Components/Panels/PanelWithInfo';


export interface RangeBespokeColumnsWizardProps extends AdaptableWizardStepProps<IRange> {
    Columns: Array<IColumn>
}
export interface RangeBespokeColumnsWizardState {
    AllColumns: Array<string>
    SelectedColumns: Array<string>
}

export class RangeBespokeColumnsWizard extends React.Component<RangeBespokeColumnsWizardProps, RangeBespokeColumnsWizardState> implements AdaptableWizardStep {
    constructor(props: RangeBespokeColumnsWizardProps) {
        super(props)
        this.state = {
            AllColumns: this.props.Columns.map(c => c.FriendlyName),
            SelectedColumns: this.props.Data.Columns,
        }

    }



    render(): any {
        let infoBody: any[] = ["Select the columns for the range.", <br />, <br />]

        return <PanelWithInfo header="Select Columns For Range" bsStyle="primary" infoBody={infoBody}>
            <DualListBoxEditor AvailableValues={this.state.AllColumns}
                SelectedValues={this.state.SelectedColumns}
                HeaderAvailable="Columns"
                HeaderSelected="Columns in Range"
                onChange={(SelectedValues) => this.OnSelectedValuesChange(SelectedValues)}></DualListBoxEditor>
        </PanelWithInfo>
    }
    OnSelectedValuesChange(newValues: Array<string>) {
        this.setState({ SelectedColumns: newValues } as RangeBespokeColumnsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        if (this.props.Data.RangeColumnScope == RangeColumnScope.AllColumns || this.props.Data.RangeColumnScope == RangeColumnScope.VisibleColumns) {
            return true;
        }
        return this.state.SelectedColumns.length > 0;
    }
    public canBack(): boolean { return true }
    public Next(): void {
        if (this.props.Data.RangeColumnScope == RangeColumnScope.BespokeColumns) {
            this.props.Data.Columns = this.state.SelectedColumns.map(c =>
                this.props.Columns.find(col => col.FriendlyName == c).ColumnId)
        }
    }
    public Back(): void { }
    public StepName = "Select Columns for Range"
}
*/