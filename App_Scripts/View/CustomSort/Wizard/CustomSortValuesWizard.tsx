import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ICustomSort } from '../../../Strategy/Interface/ICustomSortStrategy';
import { DistinctCriteriaPairValue } from '../../../Core/Enums';
import { PanelWithInfo } from '../../Components/Panels/PanelWithInfo';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { DualListBoxEditor } from "../../Components/ListBox/DualListBoxEditor";

export interface CustomSortValuesWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: Array<IColumn>
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
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
            ColumnValues: this.props.getColumnValueDisplayValuePairDistinctList(this.props.Data.ColumnId, DistinctCriteriaPairValue.DisplayValue),
            SelectedValues: this.props.Data.Values,
            IsEdit: this.props.Data.Values.length > 0
        }
        //  this.StepName = this.StepName + this.props.Columns.find(x => x.ColumnId == this.props.Data.ColumnId).FriendlyName
    }

    render(): any {
        let columnName = this.props.Columns.find(x => x.ColumnId == this.props.Data.ColumnId).FriendlyName;
        let infoBody: any[] = ["Create a custom sort for the '" + columnName + "' column by moving items to the 'Custom Sort Order' listbox.", <br />, <br />, "Use the buttons on the right of the box to order items in the list as required.", <br />, <br />, "The new sort will consist first of the items in the 'Custom Sort Order' listbox; all other column values will then sort alphabetically."]
        let availableValues: any[] = this.state.ColumnValues.map(c => c[DistinctCriteriaPairValue.DisplayValue]);
        return <div className="adaptable_blotter_style_wizard_customsort_values">
            <PanelWithInfo header={"Sort Order for: " + columnName} bsStyle="primary" infoBody={infoBody}>
                <DualListBoxEditor AvailableValues={availableValues}
                    SelectedValues={this.state.SelectedValues}
                    HeaderAvailable="Column Values"
                    HeaderSelected="Custom Sort Order"
                    onChange={(SelectedValues) => this.OnSelectedValuesChange(SelectedValues)}></DualListBoxEditor>
            </PanelWithInfo>
        </div>
    }
    OnSelectedValuesChange(newValues: Array<string>) {
        this.setState({ SelectedValues: newValues } as CustomSortValuesWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return this.state.SelectedValues.length > 0; }
    public canBack(): boolean { return !this.state.IsEdit; }
    public Next(): void { this.props.Data.Values = this.state.SelectedValues }
    public Back(): void { }
    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}   