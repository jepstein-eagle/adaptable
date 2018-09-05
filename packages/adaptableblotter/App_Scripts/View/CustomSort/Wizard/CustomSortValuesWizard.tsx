import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { DistinctCriteriaPairValue } from '../../../Core/Enums';
import { PanelWithInfo } from '../../Components/Panels/PanelWithInfo';
import { DualListBoxEditor } from "../../Components/ListBox/DualListBoxEditor";
import { ICustomSort } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { IAdaptableBlotter } from "../../../Core/Interface/IAdaptableBlotter";

export interface CustomSortValuesWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: Array<IColumn>
   Blotter: IAdaptableBlotter
}
export interface CustomSortValuesWizardState {
    ColumnValues: any[],
    SelectedValues: Array<string>
    IsEdit: boolean
}

export class CustomSortValuesWizard extends React.Component<CustomSortValuesWizardProps, CustomSortValuesWizardState> implements AdaptableWizardStep {
    constructor(props: CustomSortValuesWizardProps) {
        super(props)
        this.state = {
            ColumnValues: this.props.Blotter.getColumnValueDisplayValuePairDistinctList(this.props.Data.ColumnId, DistinctCriteriaPairValue.DisplayValue),
            SelectedValues: this.props.Data.SortedValues,
            IsEdit: this.props.Data.SortedValues.length > 0
        }
    }

    render(): any {
        let columnId = this.props.Columns.find(x => x.ColumnId == this.props.Data.ColumnId).FriendlyName;
        let infoBody: any[] = ["Create a custom sort for the '" + columnId + "' column by moving items to the 'Custom Sort Order' listbox.", <br />, <br />, "Use the buttons on the right of the box to order items in the list as required.", <br />, <br />, "The new sort will consist first of the items in the 'Custom Sort Order' listbox; all other column values will then sort alphabetically."]
        let cssClassName: string = this.props.cssClassName + "-values"

        return <div className={cssClassName}>
            <PanelWithInfo cssClassName={cssClassName} header={"Sort Order for: " + columnId} bsStyle="primary" infoBody={infoBody}>
                <DualListBoxEditor AvailableValues={this.state.ColumnValues}
                    cssClassName={cssClassName}
                    SelectedValues={this.state.SelectedValues}
                    HeaderAvailable="Column Values"
                    HeaderSelected="Custom Sort Order"
                    DisplayMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                    SortMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]}
                    ValueMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                    onChange={(SelectedValues) => this.OnSelectedValuesChange(SelectedValues)}
                    ReducedDisplay={true} />
            </PanelWithInfo>
        </div>
    }
    OnSelectedValuesChange(newValues: Array<string>) {
        this.setState({ SelectedValues: newValues } as CustomSortValuesWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return this.state.SelectedValues.length > 0; }
    public canBack(): boolean { return !this.state.IsEdit; }
    public Next(): void { this.props.Data.SortedValues = this.state.SelectedValues }
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