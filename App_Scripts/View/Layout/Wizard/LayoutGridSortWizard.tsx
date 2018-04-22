import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock, Checkbox, Glyphicon, Button } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ILayout } from '../../../Strategy/Interface/ILayoutStrategy';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IColumn } from "../../../Core/Interface/IColumn";
import { SortOrder, SelectionMode } from "../../../Core/Enums";
import { IGridSort } from "../../../Core/Interface/Interfaces";
import { EnumExtensions } from "../../../Core/Extensions/EnumExtensions";
import { GridSortRow } from '../GridSortRow'
import { IColItem } from "../../UIInterfaces";
import { AdaptableObjectCollection } from '../../Components/AdaptableObjectCollection';
import { ObjectFactory } from "../../../Core/ObjectFactory";
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";


export interface LayoutGridSortWizardProps extends AdaptableWizardStepProps<ILayout> {
    Columns: Array<IColumn>
}

export interface LayoutGridSortWizardState {
    GridSorts: IGridSort[]
}

export class LayoutGridSortWizard extends React.Component<LayoutGridSortWizardProps, LayoutGridSortWizardState> implements AdaptableWizardStep {


    onEdit(arg0: any): any {
        throw new Error("Method not implemented.");
    }
    constructor(props: LayoutGridSortWizardProps) {
        super(props)

        this.state = {
            GridSorts: this.props.Data.GridSorts
        }
    }
    render(): any {

        let addButton = <Button bsSize={"small"} bsStyle={"default"} style={{ marginBottom: '20px' }} onClick={() => this.addSort()}><Glyphicon glyph="plus" />Add Sort</Button>

        let colItems: IColItem[] = [
            { Content: "Column", Size: 4 },
            { Content: "Sort Order", Size: 4 },
            { Content: "", Size: 4 },
        ]

        let gridSortRows = this.state.GridSorts.map((x, index) => {
            return <GridSortRow
                key={index}
                cssClassName={""}
                AdaptableBlotterObject={null}
                colItems={colItems}
                Columns={this.props.Columns}
                UserFilters={null}
                Index={index}
                onEdit={null}
                onDeleteGridSort={() => this.onDeleteGridSort(index)}
                onGridSortColumnChanged={(column) => this.onColumnSelectedChanged(index, column)}
                onGridSortOrderChanged={(sortOrder) => this.onSortOrderChanged(index, sortOrder)}
                onShare={null}
                TeamSharingActivated={false}
                onDeleteConfirm={null}
                GridSort={x}
            >
            </GridSortRow>
        })

        let sortOrders = EnumExtensions.getNames(SortOrder).filter(s => s != SortOrder.Unknown).map((enumName) => {
            return <option style={{ fontSize: "5px" }} key={enumName} value={enumName}>{enumName}</option>
        })
        let cssClassName: string = this.props.cssClassName + "__gridsort"
       
        return <div className={cssClassName}>
        <Panel header="Sort Information" bsStyle="primary"  style={{overflowY: "visible"}} >
                <div>
                    {addButton}
                    {gridSortRows.length > 0 &&
                        <AdaptableObjectCollection cssClassName={cssClassName} colItems ={colItems} items={gridSortRows} allowOverflow={true} />
                    }
                </div>
            </Panel>
        </div>
    }


    addSort(): any {
        let sorts: IGridSort[] = [].concat(this.state.GridSorts, ObjectFactory.CreateEmptyGridSort())
        this.setState({ GridSorts: sorts } as LayoutGridSortWizardState, () => this.props.UpdateGoBackState())

    }
    private onHasSortCheckedChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        //    this.setState({ HasSortOrder: e.checked } as LayoutGridSortWizardState, () => this.props.UpdateGoBackState())
    }

    private onColumnSelectedChanged(index: number, column: IColumn) {
        let sorts: IGridSort[] = [].concat(this.state.GridSorts)
        let sort: IGridSort = sorts[index];
        sort.Column = column.ColumnId;
        this.setState({ GridSorts: sorts } as LayoutGridSortWizardState, () => this.props.UpdateGoBackState())
    }

    private onSortOrderChanged(index: number, sortOrder: SortOrder) {
        let sorts: IGridSort[] = [].concat(this.state.GridSorts)
        let sort: IGridSort = sorts[index];
        sort.SortOrder = sortOrder;
        this.setState({ GridSorts: sorts } as LayoutGridSortWizardState, () => this.props.UpdateGoBackState())
    }

    private onDeleteGridSort(index: number): any {
        let sorts: IGridSort[] = [].concat(this.state.GridSorts)
        sorts.splice(index, 1);
        this.setState({ GridSorts: sorts } as LayoutGridSortWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        let canNext: boolean = true;
        this.state.GridSorts.forEach(gs => {
            if (StringExtensions.IsNullOrEmpty(gs.Column) || gs.SortOrder == SortOrder.Unknown) {
                canNext = false;
            }
        })
        return canNext;
    }


    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.GridSorts = this.state.GridSorts
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

