import * as React from "react";
import { Panel, Well, HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../../Api/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { IUserFilter } from '../../../Utilities/Interface/IAdaptableBlotterObjects';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SelectionMode } from '../../../Utilities/Enums';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";


export interface UserFilterSelectColumnWizardProps extends AdaptableWizardStepProps<IUserFilter> {
    Columns: Array<IColumn>
}
export interface UserFilterSelectColumnWizardState {
    ColumnId: string
}

export class UserFilterSelectColumnWizard extends React.Component<UserFilterSelectColumnWizardProps, UserFilterSelectColumnWizardState> implements AdaptableWizardStep {
    constructor(props: UserFilterSelectColumnWizardProps) {
        super(props)
        this.state = {
            ColumnId: props.Data.ColumnId
        }
    }

    render(): any {

        let cssClassName: string = this.props.cssClassName + "-column"
       
        return <div className={cssClassName}>
            <Panel header="Select a Column" bsStyle="primary">
                    <HelpBlock>
                        {"Choose which column the User Filter will apply to."}
                    </HelpBlock>
                <ColumnSelector  cssClassName={cssClassName} SelectedColumnIds={[this.state.ColumnId]}
                    ColumnList={this.props.Columns}
                    onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                    SelectionMode={SelectionMode.Single} />
            </Panel>
        </div>
    }

    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ ColumnId: columns.length > 0 ? columns[0].ColumnId : "" } as UserFilterSelectColumnWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return (StringExtensions.IsNotNullOrEmpty(this.state.ColumnId));
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        if (this.props.Data.ColumnId != this.state.ColumnId) {
            this.props.Data.Expression = ExpressionHelper.CreateEmptyExpression();
        }
        this.props.Data.ColumnId = this.state.ColumnId;
    }

    public Back(): void { //
    }
    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}
