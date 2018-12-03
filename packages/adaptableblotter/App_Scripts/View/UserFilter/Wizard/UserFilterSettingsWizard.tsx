import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock, Well } from 'react-bootstrap';
import { IColumn } from '../../../api/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { IUserFilter } from '../../../api/Interface/IAdaptableBlotterObjects';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions'
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";

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
        let cssClassName: string = this.props.cssClassName + "-settings"

        return <div className={cssClassName}>
            <Panel header="Filter Settings" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="filterName">
                        <Col xs={12}>
                            <HelpBlock>
                                {"Select a name for the User Filter - this is the name that will appear in Query Builder and Column Filter dropdowns."}
                            </HelpBlock>
                        </Col>
                        <Col xs={2} componentClass={ControlLabel}>Filter Name: </Col>
                        <Col xs={8}>
                            <FormGroup controlId="formInlineName" validationState={validationState}>
                                <FormControl value={this.state.FilterName} type="string" placeholder="Enter filter name"
                                    onChange={(e) => this.onFilterNameChange(e)} />
                                <FormControl.Feedback />
                                <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <Col xs={2}>{' '} </Col>
                </AdaptableBlotterForm>
            </Panel>
        </div>
    }


    onFilterNameChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            FilterName: e.value,
            ErrorMessage: this.props.UserFilters.findIndex(x => x.Name == e.value && x.ColumnId == this.props.Data.ColumnId) > -1 ?
                "A User Filter already exists with that name for column: " + ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns)
                :
                null

        } as UserFilterSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return StringExtensions.IsNotEmpty(this.state.FilterName) && StringExtensions.IsNullOrEmpty(this.state.ErrorMessage);
    }


    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.Name = this.state.FilterName
    }
    public Back(): void { /* no implementation */ }
    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}