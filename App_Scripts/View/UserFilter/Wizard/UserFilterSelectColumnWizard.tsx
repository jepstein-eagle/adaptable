import * as React from "react";
import { Col, Panel } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { IUserFilter } from '../../../Core/Interface/IExpression';
import { StringExtensions } from '../../../Core/Extensions';
import { SelectionMode } from '../../../Core/Enums';
import { ColumnSelector } from '../../ColumnSelector';
import { UserFilterHelper } from '../../../Core/Helpers/UserFilterHelper';
import { ExpressionHelper } from '../../../Core/Helpers/ExpressionHelper';


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

        let selectedColumnValues: string[] = StringExtensions.IsNullOrEmpty(this.state.ColumnId) ? [] : [this.state.ColumnId];

        return <Panel header="Select a Column" bsStyle="primary">
            <ColumnSelector SelectedColumnIds={[this.state.ColumnId]}
                ColumnList={this.props.Columns}
                onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                SelectionMode={SelectionMode.Single} />
        </Panel>
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
    public StepName = "User Filter Column "
}
