import * as React from "react";
import { Radio, Col, Panel,  HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { MessageType, ActionMode } from '../../../Utilities/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { ICellValidationRule } from "../../../Utilities/Interface/BlotterObjects/ICellValidationRule";

export interface CellValidationActionWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
   
}
export interface CellValidationSettingsWizardState {
    ActionMode: ActionMode;
}

export class CellValidationActionWizard extends React.Component<CellValidationActionWizardProps, CellValidationSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationActionWizardProps) {
        super(props)
        this.state = {
            ActionMode: this.props.Data.ActionMode as ActionMode,
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
                        <Radio inline value={ActionMode.StopEdit} checked={this.state.ActionMode == ActionMode.StopEdit} onChange={(e) => this.onActionModeChanged(e)}>Prevent the cell edit</Radio>
                        {' '}{' '}
                        <AdaptablePopover  cssClassName={cssClassName} headerText={"Cell Validation Action: Prevent"} bodyText={["Disallows all cell edits that break the validation rule with no override available."]} MessageType={MessageType.Info} />
                    </Col>
                    <Col xs={12} className="ab_large_margin">
                        <Radio inline value={ActionMode.WarnUser} checked={this.state.ActionMode == ActionMode.WarnUser} onChange={(e) => this.onActionModeChanged(e)}>Show a warning</Radio>
                        {' '}<AdaptablePopover  cssClassName={cssClassName} headerText={"Cell Validation Action: Warning"} bodyText={["Displays a warning that the validation rule has been broken.  If this is overriden, the edit will be allowed."]} MessageType={MessageType.Info} />
                    </Col>
                </AdaptableBlotterForm>

            </Panel>
        </div>

    }


    private onActionModeChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ActionMode: e.value as ActionMode} as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }




    public canNext(): boolean {
        return true;
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.ActionMode = this.state.ActionMode;
    }

    public Back(): void { 
        //
    }

    public GetIndexStepIncrement(){
        return 1;
    }
    public GetIndexStepDecrement(){
        return 1;
    }
    public StepName = this.props.StepName
}

