
import * as React from "react";
import { Panel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { IColumn } from '../../../Core/Interface/IColumn';
import { SelectionMode } from '../../../Core/Enums';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { ICustomSort } from "../../../Core/Api/Interface/AdaptableBlotterObjects";

export interface CustomSortColumnWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: Array<IColumn>
}

export interface CustomSortColumnWizardState {
    SelectedColumnId: string
}

export class CustomSortColumnWizard extends React.Component<CustomSortColumnWizardProps, CustomSortColumnWizardState> implements AdaptableWizardStep {
    constructor(props: CustomSortColumnWizardProps) {
        super(props);
        this.state = { SelectedColumnId: this.props.Data.ColumnId }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-column"
        return <div className={cssClassName}>
             <Panel header="Select a Column" bsStyle="primary">
                <ColumnSelector  cssClassName={cssClassName} SelectedColumnIds={[this.state.SelectedColumnId]}
                    ColumnList={this.props.Columns}
                    onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                    SelectionMode={SelectionMode.Single} />
            </Panel>
        </div>
    }

    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ SelectedColumnId: columns.length > 0 ? columns[0].ColumnId : "" }, () => this.props.UpdateGoBackState())
    }
    public canNext(): boolean { return (StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)); }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.ColumnId = this.state.SelectedColumnId }
    public Back(): void { }
    public GetIndexStepIncrement(){
        return 1;
    }
    public GetIndexStepDecrement(){
        return 1;
    }
    public StepName = this.props.StepName
}