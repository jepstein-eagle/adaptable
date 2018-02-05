import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Col, Panel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { IPlusMinusCondition } from '../../../Strategy/Interface/IPlusMinusStrategy';
import { PopoverType } from '../../../Core/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { ExpressionHelper } from '../../../Core/Helpers/ExpressionHelper'
import { AdaptableBlotterForm } from '../../AdaptableBlotterForm'

export interface PlusMinusSettingsWizardProps extends AdaptableWizardStepProps<IPlusMinusCondition> {
  }
export interface PlusMinusSettingsWizardState {
    DefaultNudge: number
    ExpressionOption: string
}

export class PlusMinusSettingsWizard extends React.Component<PlusMinusSettingsWizardProps, PlusMinusSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PlusMinusSettingsWizardProps) {
        super(props)
        this.state = {
            DefaultNudge: this.props.Data.DefaultNudge,
            ExpressionOption: this.props.Data.ColumnId == "" ?
                "" :
                ((this.props.Data.Expression == null || ExpressionHelper.IsExpressionEmpty(this.props.Data.Expression)) ? "whole" : "expression")
        }
    }
    componentDidMount() {
        this.props.UpdateGoBackState(this.state.ExpressionOption == "whole")
    }

    render(): any {
      
        return <Panel header="Plus/Minus Settings" bsStyle="primary">
            <AdaptableBlotterForm horizontal>
                      <FormGroup controlId="nudgeColumn">
                    <Col xs={3} componentClass={ControlLabel}>Nudge Value: </Col>
                    <Col xs={9}>
                        <FormControl value={this.state.DefaultNudge.toString()} type="number" placeholder="Enter a Number" onChange={(e) => this.onColumnDefaultNudgeValueChange(e)} />
                    </Col>
                </FormGroup>
                <FormGroup controlId="applyTo">
                    <Col xs={3} componentClass={ControlLabel}>Apply As: </Col>
                    <Col xs={9}>
                        <Radio value="whole" checked={this.state.ExpressionOption == 'whole'} onChange={(e) => this.onExpressionOptionChange(e)}>
                            Default Nudge Value for Column {' '}
                            <AdaptablePopover headerText={"Plus Minus Settings: Apply As"} bodyText={["Set default nudge value for the column"]} popoverType={PopoverType.Info} />
                        </Radio>
                        <Radio value="expression" checked={this.state.ExpressionOption == 'expression'} onChange={(e) => this.onExpressionOptionChange(e)}>
                            Custom Plus/Minus Rule {' '}
                            <AdaptablePopover headerText={"Plus Minus Settings: Apply As"} bodyText={["Create a Custom Plus/Minus Rule (using the Query Builder in the next step of the wizard)"]} popoverType={PopoverType.Info} />
                        </Radio>
                    </Col>
                </FormGroup>
            </AdaptableBlotterForm>
        </Panel>
    }

    private onExpressionOptionChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ExpressionOption: e.value } as PlusMinusSettingsWizardState, () => this.props.UpdateGoBackState(e.value == "whole"))
    }

     onColumnDefaultNudgeValueChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ DefaultNudge: parseFloat(e.value) } as PlusMinusSettingsWizardState, () => this.props.UpdateGoBackState(this.state.ExpressionOption == "whole"))
    }

    public canNext(): boolean {
        return Number.isFinite(this.state.DefaultNudge)
            && this.state.ExpressionOption != "";
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.DefaultNudge = this.state.DefaultNudge
    }
    public Back(): void { }
    public StepName = this.props.StepName
}