import * as React from "react";
import { Modal } from 'react-bootstrap';
import { AdaptableWizardStep } from './Interface/IAdaptableWizard'
import { WizardLegend } from './WizardLegend'
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ButtonCancel } from "../Components/Buttons/ButtonCancel";
import { ButtonWizardAction } from "../Components/Buttons/ButtonWizardAction";
import { AccessLevel } from "../../Utilities/Enums";


export interface AdaptableWizardProps extends React.ClassAttributes<AdaptableWizard> {
    Steps: JSX.Element[]
    Data: any
    onHide: Function;
    onFinish?: Function;
    StepStartIndex?: number
    StepNames?: string[] // feels wrong, wrong, wrong
    FriendlyName?: string
    ModalContainer: HTMLElement
    cssClassName: string
    canFinishWizard: Function
}

export interface AdaptableWizardState extends React.ClassAttributes<AdaptableWizard> {
    ActiveState: any
    IndexState: number
}

class DummyActiveStep implements AdaptableWizardStep {
    public StepName = ""
    public canNext(): boolean { return false; }
    public canBack(): boolean { return false; }

    public Next(): void {
        // no implementation for this 
    }
    public Back(): void {
        // no implementation for this
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }

}

//Remark : the component doesnt handle the change of props once displayed... It's easy to do but not sure it's needed
//as in the top component we do the render with a ternary expression so we add/remove the element from the render instead of having a property
//Show/hide. 
export class AdaptableWizard extends React.Component<AdaptableWizardProps, AdaptableWizardState> {
    //we need to init with a dummy one as Ref is a callback once the component is rendered. So once set we force Re render.... 
    //I have no idea so far how to do it differently
    private ActiveStep: AdaptableWizardStep = new DummyActiveStep();
    public StepName: string
    constructor(props: AdaptableWizardProps) {
        super(props);
        let indexStart = 0
        if (this.props.StepStartIndex) {
            indexStart = this.props.StepStartIndex
        }
        let BodyElement: JSX.Element = this.props.Steps[indexStart];
        let newElement = this.cloneWizardStep(BodyElement)
        this.state = { ActiveState: newElement, IndexState: indexStart }
    }

    render() {
        let cssClassName: string = StyleConstants.AB_STYLE
        return (
            <Modal show={true} onHide={this.props.onHide} className={cssClassName + StyleConstants.BASE}
                container={this.props.ModalContainer} >
                <div className={cssClassName + StyleConstants.WIZARD_BASE}>
                    <Modal.Header closeButton className={cssClassName + StyleConstants.WIZARD_HEADER}>
                        <Modal.Title>
                            <WizardLegend StepNames={this.props.StepNames} ActiveStepName={this.ActiveStep.StepName} FriendlyName={this.props.FriendlyName} CanShowAllSteps={this.canFinishWizard()} onStepButtonClicked={(s) => this.onStepButtonClicked(s)} />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cssClassName + StyleConstants.WIZARD_BODY}>
                        <div className="ab_main_wizard">
                            {this.state.ActiveState}
                        </div>
                    </Modal.Body>
                    <Modal.Footer className={cssClassName + StyleConstants.WIZARD_FOOTER}>
                        <ButtonCancel cssClassName={cssClassName} DisplayMode={"Glyph+Text"} bsStyle={"default"} style={{ float: "left", marginRight: "5px" }} onClick={() => this.props.onHide()} hideToolTip={true} AccessLevel={AccessLevel.Full} />
                        <ButtonWizardAction cssClassName={cssClassName} DisplayMode={"Glyph+Text"} bsStyle="default" overrideDisableButton={!this.ActiveStep.canBack() || this.isFirstStep()} onClick={() => this.handleClickBack()} glyph="chevron-left" overrideText="Back" AccessLevel={AccessLevel.Full} />
                        <ButtonWizardAction cssClassName={cssClassName} DisplayMode={"Glyph+Text"} bsStyle="info" overrideDisableButton={!this.ActiveStep.canNext() || this.isLastStep()} onClick={() => this.handleClickNext()} overrideText="Next" glyph={"chevron-right"} AccessLevel={AccessLevel.Full} />
                        <ButtonWizardAction cssClassName={cssClassName} DisplayMode={"Glyph+Text"} bsStyle="primary" overrideDisableButton={!this.canFinishWizard()} onClick={() => this.handleClickFinish()} overrideText="Finish" glyph={"ok"} AccessLevel={AccessLevel.Full} />
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }

    private onStepButtonClicked(stepName: string): void {
        let stepIndex: number = this.props.StepNames.findIndex(s => s == stepName);
        let BodyElement: any = this.props.Steps[stepIndex];
        let newElement = this.cloneWizardStep(BodyElement)
            this.setState({ ActiveState: newElement, IndexState: stepIndex })
    }

    ForceUpdateGoBackState() {
        //to force back/next. We'll see if that needs to be optimised'
        /*
           <Modal.Title>Step {this.state.IndexState + 1 + " of " + this.props.Steps.length} - {this.ActiveStep.StepName}</Modal.Title>
                
           */
        this.forceUpdate();
        //  this.setState({ ForceFinish: forceFinish } as AdaptableWizardState)
    }

    isLastStep(): boolean {
        return this.state.IndexState == (this.props.Steps.length - 1);
    }

    isFirstStep(): boolean {
        return this.state.IndexState == 0;
    }

      canFinishWizard(): boolean {
        return this.ActiveStep.canNext() && this.props.canFinishWizard();
    }

    handleClickBack() {
        if (!this.isFirstStep()) {
            if (this.ActiveStep.canBack()) {
                let decrement = this.ActiveStep.GetIndexStepDecrement()
                this.ActiveStep.Back();
                let BodyElement: any = this.props.Steps[this.state.IndexState - decrement];
                let newElement = this.cloneWizardStep(BodyElement)
                this.setState({ ActiveState: newElement, IndexState: this.state.IndexState - decrement })
            }
        }
    }

    handleClickNext() {
        if (this.ActiveStep.canNext()) {
            let increment = this.ActiveStep.GetIndexStepIncrement()
            this.ActiveStep.Next();
            let BodyElement: any = this.props.Steps[this.state.IndexState + increment];
            let newElement = this.cloneWizardStep(BodyElement)
            this.setState({ ActiveState: newElement, IndexState: this.state.IndexState + increment })
        }
    }

    handleClickFinish() {
        if (this.ActiveStep.canNext()) {
            this.ActiveStep.Next();
            if (this.props.onFinish) {
                this.props.onFinish();
            }
            this.props.onHide();
        }
    }


    //So we inject everything needed for the Wizard
    private cloneWizardStep(step: JSX.Element): JSX.Element {
        return React.cloneElement(step, {
            ref: (Element: AdaptableWizardStep) => { this.ActiveStep = Element; this.forceUpdate(); },
            Data: this.props.Data,
            UpdateGoBackState: () => this.ForceUpdateGoBackState()
        })
    }
}

