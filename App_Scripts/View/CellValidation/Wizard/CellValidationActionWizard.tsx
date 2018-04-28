import * as React from "react";
import { Radio, Col, Panel,  HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { CellValidationMode, PopoverType } from '../../../Core/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { ICellValidationRule } from "../../../Core/Api/AdaptableBlotterObjects";

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
        let cssClassName: string = this.props.cssClassName + "-action"
       
        return <div className={cssClassName}>
        <Panel header="Action When Validation Fails" bsStyle="primary">

                <AdaptableBlotterForm inline>
                    <Col xs={12}>
                        <HelpBlock>Choose what should happen to an edit when cell validation fails.</HelpBlock>
                    </Col>
                    <Col xs={12}>
                        <HelpBlock><i>Prevent cell edit</i> ensures that no edits which fail validation will occur.</HelpBlock>
                    </Col>
                    <Col xs={12}>
                    <HelpBlock><i>Show a warning</i> gives you the option to allow the edit after providing a reason (which will be audited).</HelpBlock>
                   </Col>
                    <Col xs={12} className="ab_large_margin">
                        <Radio inline value={CellValidationMode.StopEdit} checked={this.state.CellValidationMode == CellValidationMode.StopEdit} onChange={(e) => this.onCellValidationModeChanged(e)}>Prevent the cell edit</Radio>
                        {' '}{' '}
                        <AdaptablePopover  cssClassName={cssClassName} headerText={"Cell Validation Action: Prevent"} bodyText={["Disallows all cell edits that break the validation rule with no override available."]} popoverType={PopoverType.Info} />
                    </Col>
                    <Col xs={12} className="ab_large_margin">
                        <Radio inline value={CellValidationMode.WarnUser} checked={this.state.CellValidationMode == CellValidationMode.WarnUser} onChange={(e) => this.onCellValidationModeChanged(e)}>Show a warning</Radio>
                        {' '}<AdaptablePopover  cssClassName={cssClassName} headerText={"Cell Validation Action: Warning"} bodyText={["Displays a warning that the validation rule has been broken.  If this is overriden, the edit will be allowed."]} popoverType={PopoverType.Info} />
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

    public GetIndexStepIncrement(){
        return 1;
    }
    public GetIndexStepDecrement(){
        return 1;
    }
    public StepName = this.props.StepName
}

