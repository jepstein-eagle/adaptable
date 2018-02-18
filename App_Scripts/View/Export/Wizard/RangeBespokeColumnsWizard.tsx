/*
import * as React from "react";
import { ControlLabel, Button, Form, Col, Panel, ListGroup, Row, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';
import { IColumn, IRawValueDisplayValuePair } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { DualListBoxEditor } from './../../DualListBoxEditor'
import { IReport } from '../../../Core/Interface/IExportStrategy';
import { DataType, DistinctCriteriaPairValue, ReportColumnScope } from '../../../Core/Enums';
import { PanelWithInfo } from '../../Components/Panels/PanelWithInfo';


export interface ReportBespokeColumnsWizardProps extends AdaptableWizardStepProps<IReport> {
    Columns: Array<IColumn>
}
export interface ReportBespokeColumnsWizardState {
    AllColumns: Array<string>
    SelectedColumns: Array<string>
}

export class ReportBespokeColumnsWizard extends React.Component<ReportBespokeColumnsWizardProps, ReportBespokeColumnsWizardState> implements AdaptableWizardStep {
    constructor(props: ReportBespokeColumnsWizardProps) {
        super(props)
        this.state = {
            AllColumns: this.props.Columns.map(c => c.FriendlyName),
            SelectedColumns: this.props.Data.Columns,
        }

    }



    render(): any {
        let infoBody: any[] = ["Select the columns for the Report.", <br />, <br />]

        return <PanelWithInfo header="Select Columns For Report" bsStyle="primary" infoBody={infoBody}>
            <DualListBoxEditor AvailableValues={this.state.AllColumns}
                SelectedValues={this.state.SelectedColumns}
                HeaderAvailable="Columns"
                HeaderSelected="Columns in Report"
                onChange={(SelectedValues) => this.OnSelectedValuesChange(SelectedValues)}></DualListBoxEditor>
        </PanelWithInfo>
    }
    OnSelectedValuesChange(newValues: Array<string>) {
        this.setState({ SelectedColumns: newValues } as ReportBespokeColumnsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        if (this.props.Data.ReportColumnScope == ReportColumnScope.AllColumns || this.props.Data.ReportColumnScope == ReportColumnScope.VisibleColumns) {
            return true;
        }
        return this.state.SelectedColumns.length > 0;
    }
    public canBack(): boolean { return true }
    public Next(): void {
        if (this.props.Data.ReportColumnScope == ReportColumnScope.BespokeColumns) {
            this.props.Data.Columns = this.state.SelectedColumns.map(c =>
                this.props.Columns.find(col => col.FriendlyName == c).ColumnId)
        }
    }
    public Back(): void { }
    public StepName = this.props.StepName
}
*/