import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock, Checkbox } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ILayout } from '../../../Strategy/Interface/ILayoutStrategy';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IColumn } from "../../../Core/Interface/IColumn";
import { SortOrder, SelectionMode } from "../../../Core/Enums";
import { IGridSort } from "../../../Core/Interface/Interfaces";
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { EnumExtensions } from "../../../Core/Extensions/EnumExtensions";

export interface LayoutGridSortWizardProps extends AdaptableWizardStepProps<ILayout> {
    Columns: Array<IColumn>
}

export interface LayoutGridSortWizardState {
    ColumnId: string,
    SortOrder: SortOrder,
    HasSortOrder: boolean
}

export class LayoutGridSortWizard extends React.Component<LayoutGridSortWizardProps, LayoutGridSortWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutGridSortWizardProps) {
        super(props)
        
        this.state = {
            ColumnId: (this.props.Data.GridSorts.length > 0) ? this.props.Data.GridSorts[0].Column : "",
            SortOrder: (this.props.Data.GridSorts.length > 0) ? this.props.Data.GridSorts[0].SortOrder : SortOrder.Ascending,
            HasSortOrder: this.props.Data.GridSorts.length > 0 
        }
    }
    render(): any {

        let sortOrders = EnumExtensions.getNames(SortOrder).filter(s => s != SortOrder.Unknown).map((enumName) => {
            return <option style={{ fontSize: "5px" }} key={enumName} value={enumName}>{enumName}</option>
        })

        return <div className="adaptable_blotter_style_wizard_layout_settings">
            <Panel header="Sort Information" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="layoutShowSort">
                        <Col xs={4} componentClass={ControlLabel}>Add Column Sort to Layout: </Col>
                        <Col xs={1}>
                            <Checkbox value="HasSortOrder" checked={this.state.HasSortOrder} onChange={(e) => this.onHasSortCheckedChanged(e)} />
                        </Col>
                        <Col xs={6} />
                    </FormGroup>
                    {this.state.HasSortOrder &&
                        <div>
                            <FormGroup controlId="layoutSortColumn" >
                                <Col xs={4} componentClass={ControlLabel}>Column: </Col>
                                <Col xs={5}>
                                    <ColumnSelector SelectedColumnIds={[this.state.ColumnId]}
                                        ColumnList={this.props.Columns}
                                        onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                                        SelectionMode={SelectionMode.Single} />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="layoutSortOrder">
                                <Col xs={4} componentClass={ControlLabel}>Sort Order: </Col>
                                <Col xs={5}>
                                    <FormControl componentClass="select" placeholder="select"
                                        value={this.state.SortOrder}
                                        onChange={(x) => this.onSortOrderChanged(x)} >
                                        {sortOrders}

                                    </FormControl>
                                </Col>
                            </FormGroup>
                        </div>
                    }
                </AdaptableBlotterForm>
            </Panel>
        </div>
    }

    private onHasSortCheckedChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ HasSortOrder: e.checked } as LayoutGridSortWizardState, () => this.props.UpdateGoBackState())
    }

    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ ColumnId: columns.length > 0 ? columns[0].ColumnId : "" } as LayoutGridSortWizardState, () => this.props.UpdateGoBackState())
    }

    private onSortOrderChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ SortOrder: e.value } as LayoutGridSortWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        if (this.state.HasSortOrder) {
            return StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
        }
        return true
    }


    public canBack(): boolean { return true; }

    public Next(): void {
        if (this.state.HasSortOrder) {
            this.props.Data.GridSorts = [{ Column: this.state.ColumnId, SortOrder: this.state.SortOrder }]
        }
    }
    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;  // some way of knowing to go back 2 steps?
    }
    public StepName = this.props.StepName
}

