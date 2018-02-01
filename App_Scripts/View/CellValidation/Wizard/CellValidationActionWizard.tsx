import * as React from "react";
import { Radio, FormGroup, FormControl, Button, Form, Row, Col, Panel, Well, Checkbox, HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ICellValidationRule } from '../../../Strategy/Interface/ICellValidationStrategy';
import { IRangeExpression } from '../../../Core/Interface/IExpression';
import { DataType, CellValidationMode, LeafExpressionOperator, PopoverType } from '../../../Core/Enums';
import { StringExtensions } from '../../../Core/Extensions';
import { AdaptableBlotterForm } from '../../AdaptableBlotterForm'
import { AdaptablePopover } from '../../AdaptablePopover';

export interface CellValidationActionWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Columns: Array<IColumn>
}
export interface CellValidationSettingsWizardState {
    CellValidationMode: CellValidationMode;
}

export class CellValidationActionWizard extends React.Component<CellValidationActionWizardProps, CellValidationSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationActionWizardProps) {
        super(props)
        this.state = {
            CellValidationMode: this.props.Data.CellValidationMode,
        }
    }

    render(): any {

        return <div>
            <Panel header="Action When Validation Fails" bsStyle="primary">

                <AdaptableBlotterForm inline>
                    <Col xs={12}>
                        <HelpBlock>Choose what should happen to an edit when cell validation fails.</HelpBlock>
                    </Col>
                    <Col xs={12} style={divStyle}>
                        <Radio inline value={CellValidationMode.PreventEdit} checked={this.state.CellValidationMode == CellValidationMode.PreventEdit} onChange={(e) => this.onCellValidationModeChanged(e)}>Prevent the cell edit</Radio>
                        {' '}{' '}
                        <AdaptablePopover headerText={"Cell Validation Action: Prevent"} bodyText={["Disallows all cell edits that break the validation rule with no override available."]} popoverType={PopoverType.Info} />
                    </Col>
                    <Col xs={12} style={divStyle}>
                        <Radio inline value={CellValidationMode.ShowWarning} checked={this.state.CellValidationMode == CellValidationMode.ShowWarning} onChange={(e) => this.onCellValidationModeChanged(e)}>Show a warning</Radio>
                        {' '}<AdaptablePopover headerText={"Cell Validation Action: Warning"} bodyText={["Displays a warning that the validation rule has been broken.  If this is overriden, the edit will be allowed."]} popoverType={PopoverType.Info} />
                    </Col>
                </AdaptableBlotterForm>

            </Panel>
        </div>

    }


    private onCellValidationModeChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ CellValidationMode: e.value } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }




    public canNext(): boolean {
        return true;
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.CellValidationMode = this.state.CellValidationMode;
    }

    public Back(): void { }
    public StepName = "Cell Validation Action"
}


let divStyle = {
    margin: '10px'
}

