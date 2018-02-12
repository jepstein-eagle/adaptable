import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import { ExpressionHelper } from '../../../Core/Helpers/ExpressionHelper';
import { UserFilterHelper } from '../../../Core/Helpers/UserFilterHelper';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions'
import { AdaptableBlotterForm } from '../../AdaptableBlotterForm'

export interface UserFilterSettingsWizardProps extends AdaptableWizardStepProps<IUserFilter> {
    UserFilters: IUserFilter[]
    Columns: Array<IColumn>
}
export interface UserFilterSettingsWizardState {
    FilterName: string,
    ErrorMessage: string
}

export class UserFilterSettingsWizard extends React.Component<UserFilterSettingsWizardProps, UserFilterSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: UserFilterSettingsWizardProps) {
        super(props)
        this.state = {
            FilterName: this.props.Data.Name, ErrorMessage: null
        }
    }
    render() {
        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";

        return <Panel header="Filter Settings" bsStyle="primary">
            <AdaptableBlotterForm horizontal>
                <FormGroup controlId="filterName">
                    <Col xs={3} componentClass={ControlLabel}>Filter Name: </Col>
                    <Col xs={8}>
                        <FormGroup controlId="formInlineName" validationState={validationState}>
                            <FormControl value={this.state.FilterName} type="string" placeholder="Enter filter name"
                                onChange={(e) => this.onFilterNameChange(e)} />
                            <FormControl.Feedback />
                            <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                        </FormGroup>
                    </Col>
                </FormGroup>
                <Col xs={1}>{' '} </Col>
            </AdaptableBlotterForm>
        </Panel>

    }


    onFilterNameChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            FilterName: e.value,
            ErrorMessage: this.props.UserFilters.findIndex(x => x.Name == e.value && x.ColumnId==this.props.Data.ColumnId) > -1 ? "A Filter already exists with that name" : null

        } as UserFilterSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return StringExtensions.IsNotEmpty(this.state.FilterName) && StringExtensions.IsNullOrEmpty(this.state.ErrorMessage);
    }


    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.Name = this.state.FilterName
        this.props.Data.DataType = UserFilterHelper.GetDataTypeForUserFilter(this.props.Data, this.props.Columns)
        this.props.Data.Description = ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns, this.props.UserFilters)
    }
    public Back(): void { /* no implementation */ }
    public StepName = this.props.StepName
}