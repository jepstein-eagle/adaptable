import * as React from "react";
import { Panel, Col, Radio, ControlLabel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
//import { AdaptableWizard } from './../../../Wizard/AdaptableWizard'
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptablePopover } from '../../AdaptablePopover';
import { ReportColumnScope, PopoverType } from '../../../Core/Enums';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { DualListBoxEditor } from '../../Components/ListBox/DualListBoxEditor';
import { IReport } from "../../../Core/Api/AdaptableBlotterObjects";

export interface ReportColumnChooserWizardProps extends AdaptableWizardStepProps<IReport> {
    Columns: Array<IColumn>
}
export interface ReportColumnsWizardState {
    AllColumnValues: string[];
    SelectedColumnValues: string[];
}

export class ReportColumnChooserWizard extends React.Component<ReportColumnChooserWizardProps, ReportColumnsWizardState> implements AdaptableWizardStep {
    constructor(props: ReportColumnChooserWizardProps) {
        super(props);
        this.state = {
            AllColumnValues: this.props.Columns.map(c => c.FriendlyName),
            SelectedColumnValues: this.props.Data.Columns.map(c =>
                this.props.Columns.find(col => col.ColumnId == c).FriendlyName),
        }
    }
    render() {
        let cssClassName: string = this.props.cssClassName + "-choosecolumns"
       
        return <div className={cssClassName}>
        {this.props.Data.ReportColumnScope == ReportColumnScope.BespokeColumns &&
                <Panel>
                    <DualListBoxEditor AvailableValues={this.state.AllColumnValues}
                       cssClassName={cssClassName}
                       SelectedValues={this.state.SelectedColumnValues}
                        HeaderAvailable="Columns"
                        HeaderSelected="Columns in Report"
                        onChange={(SelectedValues) => this.OnSelectedValuesChange(SelectedValues)}
                        ReducedDisplay={true} />
                </Panel>
            }
        </div>
    }



    OnSelectedValuesChange(newValues: Array<string>) {
        this.setState({ SelectedColumnValues: newValues } as ReportColumnsWizardState, () => this.props.UpdateGoBackState())
    }

   
    public canNext(): boolean {
        return (
            this.state.SelectedColumnValues.length > 0);
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.Columns = this.state.SelectedColumnValues.map(c =>
            this.props.Columns.find(col => col.FriendlyName == c).ColumnId)
    }
    public Back(): void {
        //todo
    }
    public GetIndexStepIncrement(){
        return 1;
    }
    public GetIndexStepDecrement(){
        return 1;
    }

    public StepName = this.props.StepName
}




