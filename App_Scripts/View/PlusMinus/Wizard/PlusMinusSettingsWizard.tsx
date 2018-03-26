import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Col, Panel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { IPlusMinusRule } from '../../../Strategy/Interface/IPlusMinusStrategy';
import { PopoverType } from '../../../Core/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { ExpressionHelper } from '../../../Core/Helpers/ExpressionHelper'
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";

export interface PlusMinusSettingsWizardProps extends AdaptableWizardStepProps<IPlusMinusRule> {
}
export interface PlusMinusSettingsWizardState {
    NudgeValue: number
    IsDefaultNudge: boolean
}

export class PlusMinusSettingsWizard extends React.Component<PlusMinusSettingsWizardProps, PlusMinusSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PlusMinusSettingsWizardProps) {
        super(props)
        this.state = {
            NudgeValue: this.props.Data.NudgeValue,
            IsDefaultNudge: this.props.Data.IsDefaultNudge
        }
    }
    componentDidMount() {
        this.props.UpdateGoBackState(this.state.IsDefaultNudge)
    }

    render(): any {

        return <div className="adaptable_blotter_style_wizard_plusminus_setting">
            <Panel header="Plus/Minus Settings" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="nudgeColumn">
                        <Col xs={3} componentClass={ControlLabel}>Nudge Value: </Col>
                        <Col xs={9}>
                            <FormControl value={this.state.NudgeValue.toString()} type="number" placeholder="Enter a Number" onChange={(e) => this.onColumnDefaultNudgeValueChange(e)} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="applyTo">
                        <Col xs={3} componentClass={ControlLabel}>Apply As: </Col>
                        <Col xs={9}>
                            <Radio value="expression" checked={!this.state.IsDefaultNudge} onChange={(e) => this.onExpressionOptionChange(e)}>
                                Custom Plus/Minus Rule {' '}
                                <AdaptablePopover headerText={"Plus Minus Settings: Apply As"} bodyText={["Create a Custom Plus/Minus Rule (using the Query Builder in the next step of the wizard)"]} popoverType={PopoverType.Info} />
                            </Radio>
                            <Radio value="default" checked={this.state.IsDefaultNudge} onChange={(e) => this.onExpressionOptionChange(e)}>
                                Default Nudge Value for Column {' '}
                                <AdaptablePopover headerText={"Plus Minus Settings: Apply As"} bodyText={["Set default nudge value for the column"]} popoverType={PopoverType.Info} />
                            </Radio>
                        </Col>
                    </FormGroup>
                </AdaptableBlotterForm>
            </Panel>
        </div>
    }

    private onExpressionOptionChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let isDefault: boolean = (e.value == "default")
        this.setState({ IsDefaultNudge: isDefault } as PlusMinusSettingsWizardState, () => this.props.UpdateGoBackState(isDefault))
    }

    onColumnDefaultNudgeValueChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ NudgeValue: parseFloat(e.value) } as PlusMinusSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsDefaultNudge))
    }

    public canNext(): boolean {
        return Number.isFinite(this.state.NudgeValue)
        //  && this.state.IsDefaultNudge==false;
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.NudgeValue = this.state.NudgeValue
        this.props.Data.IsDefaultNudge = this.state.IsDefaultNudge
        if (this.props.Data.IsDefaultNudge) {
            this.props.Data.Expression = ExpressionHelper.CreateEmptyExpression();
        }
    }
    public Back(): void { }
    public StepName = this.props.StepName
}