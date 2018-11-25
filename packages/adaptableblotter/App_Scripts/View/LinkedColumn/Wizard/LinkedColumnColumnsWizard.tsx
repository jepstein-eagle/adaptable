import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { PanelWithInfo } from '../../Components/Panels/PanelWithInfo';
import { DualListBoxEditor } from "../../Components/ListBox/DualListBoxEditor";
import { ILinkedColumn } from "../../../Core/Interface/Interfaces";
import { ArrayExtensions } from "../../../Core/Extensions/ArrayExtensions";
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";

export interface LinkedColumnColumnsWizardProps extends AdaptableWizardStepProps<ILinkedColumn> {
    Columns: Array<IColumn>
    LinkedColumns: ILinkedColumn[]

}
export interface LinkedColumnColumnsWizardState {
    AvailableColumns: string[],
    SelectedColumns: string[]
    IsEdit: boolean
}

export class LinkedColumnColumnsWizard extends React.Component<LinkedColumnColumnsWizardProps, LinkedColumnColumnsWizardState> implements AdaptableWizardStep {
    constructor(props: LinkedColumnColumnsWizardProps) {
        super(props)
        let currentlyLinkedColumns: string[] = [];
        this.props.LinkedColumns.map(lk => {
            currentlyLinkedColumns.push(...lk.ColumnIds)
        })
        console.log("currently linked: " + currentlyLinkedColumns)
        let allColumns: string[] = this.props.Columns.map(c => c.ColumnId);
        console.log("all " + allColumns)

        //  let availableColumnsId: string[] =allColumns.filter(c => ArrayExtensions.ContainsItem(currentlyLinkedColumns, c));
        //  console.log("availalbe id: " + availableColumnsId)
        let availableColumns: string[] = []
        allColumns.forEach(c => {
            if (ArrayExtensions.NotContainsItem(currentlyLinkedColumns, c)) {
                availableColumns.push(c);
            }
        })
        console.log("avaible : " + availableColumns)

        let availableFriendlyColumns = ColumnHelper.getFriendlyNamesFromColumnIds(availableColumns, this.props.Columns)
        console.log("friendly : " + availableFriendlyColumns)
    
        let selectedFriendlyColumns = ColumnHelper.getFriendlyNamesFromColumnIds(this.props.Data.ColumnIds, this.props.Columns)
        console.log("friendly : " + selectedFriendlyColumns)

        this.state = {
            AvailableColumns: availableFriendlyColumns,
            SelectedColumns: selectedFriendlyColumns,
            IsEdit: this.props.Data.ColumnIds.length > 0
        }
    }

    render(): any {
        let infoBody: any[] = ["Choose which columns should be linked.", <br />, <br />, "Use the buttons on the right of the box to order items in the list as required.", <br />, <br />,]
        let cssClassName: string = this.props.cssClassName + "-values"

        return <div className={cssClassName}>
            <PanelWithInfo cssClassName={cssClassName} header={"Columns in Linked Column: " + this.props.Data.LinkedColumnId} bsStyle="primary" infoBody={infoBody}>
                <DualListBoxEditor AvailableValues={this.state.AvailableColumns}
                    cssClassName={cssClassName}
                    SelectedValues={this.state.SelectedColumns}
                    HeaderAvailable="Available Columns"
                    HeaderSelected="Selected Columns"
                    onChange={(SelectedValues) => this.OnSelectedValuesChange(SelectedValues)}
                    ReducedDisplay={true} />
            </PanelWithInfo>
        </div>
    }

    OnSelectedValuesChange(newValues: Array<string>) {
     //   let selectedColumns: string[] = ColumnHelper.getFriendlyNamesFromColumnIds(newValues, this.props.Columns);
     console.log("from method: " + newValues)
        this.setState({ SelectedColumns: newValues } as LinkedColumnColumnsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return this.state.SelectedColumns.length > 0; }
    public canBack(): boolean { return !this.state.IsEdit; }
    public Next(): void { this.props.Data.ColumnIds = ColumnHelper.getColumnIdsFromFriendlyNames(this.state.SelectedColumns, this.props.Columns) }
    public Back(): void {
        // todo
    }
    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}   