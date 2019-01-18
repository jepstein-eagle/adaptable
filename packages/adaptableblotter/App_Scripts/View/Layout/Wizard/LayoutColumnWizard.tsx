
import * as React from "react";
import { IColumn } from '../../../Api/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { PanelWithInfo } from '../../Components/Panels/PanelWithInfo';
import { DualListBoxEditor } from "../../Components/ListBox/DualListBoxEditor";
import { Helper } from "../../../Utilities/Helpers/Helper";
import { SHORTCUT_ADD } from "../../../Redux/ActionsReducers/ShortcutRedux";
import { ILayout } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";

export interface LayoutColumnWizardProps extends AdaptableWizardStepProps<ILayout> {
    Columns: Array<IColumn>
}
export interface LayoutColumnWizardState {
    SelectedColumns: Array<string>
}

export class LayoutColumnWizard extends React.Component<LayoutColumnWizardProps, LayoutColumnWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutColumnWizardProps) {
        super(props)
        this.state = {
            SelectedColumns: ColumnHelper.getFriendlyNamesFromColumnIds(this.props.Data.Columns, this.props.Columns)
        }
    }

    render(): any {
        let infoBody: any[] = ["Create a layout.", <br />, <br />, "Use the buttons on the right of the box to order items in the list as required.", <br />, <br />, "The new sort will consist first of the items in the 'Custom Sort Order' listbox; all other column values will then sort alphabetically."]
        let cssClassName: string = this.props.cssClassName + "-column"

        return <div className={cssClassName}>
            <PanelWithInfo cssClassName={cssClassName} header={"Choose columns for the Layout"} bsStyle="primary" infoBody={infoBody}>
                <DualListBoxEditor AvailableValues={this.props.Columns.map(x => x.FriendlyName)}
                    cssClassName={cssClassName}
                    SelectedValues={this.state.SelectedColumns}
                    HeaderAvailable="Available Columns"
                    HeaderSelected="Columns in Layout"
                    onChange={(SelectedValues) => this.OnSelectedValuesChange(SelectedValues)}
                    ReducedDisplay={true} />
            </PanelWithInfo>
        </div>
    }
    OnSelectedValuesChange(newValues: Array<string>) {
        this.setState({ SelectedColumns: newValues } as LayoutColumnWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return this.state.SelectedColumns.length > 0; }
    public canBack(): boolean { return true;; }
    public Next(): void {
        this.props.Data.Columns = ColumnHelper.getColumnIdsFromFriendlyNames(this.state.SelectedColumns, this.props.Columns)
    }
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