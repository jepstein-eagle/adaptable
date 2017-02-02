/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Button, ListGroupItemProps, Modal, Glyphicon } from 'react-bootstrap';
import { AdaptableViewFactory } from '../AdaptableViewFactory';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './Interface/IAdaptableWizard'

interface AdaptableWizardProps extends React.ClassAttributes<AdaptableWizard> {
    Steps: JSX.Element[]
    Data: any
    onHide: Function;
    onFinish?: Function;
    StepStartIndex?: number
}

interface AdaptableWizardState extends React.ClassAttributes<AdaptableWizard> {
    ActiveState: any
    IndexState: number
    ForceFinish: boolean
}

class DummyActiveStep implements AdaptableWizardStep {
    public canNext(): boolean { return false; }
    public canBack(): boolean { return false; }
    public Next(): void { }
    public Back(): void { }
    public StepName = ""
}

//Remark : the component doesnt handle the change of props once displayed... It's easy to do but not sure it's needed
//as in the top component we do the render with a ternary expression so we add/remove the element from the render instead of having a property
//Show/hide. 
export class AdaptableWizard extends React.Component<AdaptableWizardProps, AdaptableWizardState> {
    //we need to init with a dummy one as Ref is a callback once the component is rendered. So once set we force Re render.... 
    //I have no idea so far how to do it differently
    private ActiveStep: AdaptableWizardStep = new DummyActiveStep();
    constructor(props: AdaptableWizardProps) {
        super(props);
        let indexStart = 0
        if (this.props.StepStartIndex) {
            indexStart = this.props.StepStartIndex
        }
        let BodyElement: JSX.Element = this.props.Steps[indexStart];
        let newElement = this.cloneWizardStep(BodyElement)
        this.state = { ActiveState: newElement, IndexState: indexStart, ForceFinish: false }
    }
    //So we inject everything needed for the Wizard
    private cloneWizardStep(step: JSX.Element): JSX.Element {
        return React.cloneElement(step, {
            ref: (Element: AdaptableWizardStep) => { this.ActiveStep = Element; this.forceUpdate(); },
            Data: this.props.Data,
            UpdateGoBackState: (finish: boolean = false) => this.ForceUpdateGoBackState(finish)
        })
    }
    render() {
        return (
            <Modal show={true} onHide={this.props.onHide} className="adaptable_blotter_style">
                <Modal.Header closeButton>
                    <Modal.Title>Step {this.state.IndexState + 1 + " of " + this.props.Steps.length} - {this.ActiveStep.StepName}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {this.state.ActiveState}
                </Modal.Body>
                <Modal.Footer>
                    <Button style={buttonLeftStyle} onClick={() => this.props.onHide()}>Cancel <Glyphicon glyph="remove" /></Button>
                    <Button disabled={!this.ActiveStep.canBack() || this.isFirstStep()} onClick={() => this.handleClickBack()}><Glyphicon glyph="chevron-left" /> Back</Button>
                    <Button bsStyle="primary" disabled={!this.ActiveStep.canNext()} onClick={() => this.handleClickNext()}>{this.isLastStep() ? "Finish" : "Next"} <Glyphicon glyph={this.isLastStep() ? "ok" : "chevron-right"} /></Button>
                </Modal.Footer>
            </Modal>
        );
    }
    ForceUpdateGoBackState(forceFinish: boolean) {
        //to force back/next. We'll see if that needs to be optimised'
        this.forceUpdate();
        this.setState({ ForceFinish: forceFinish } as AdaptableWizardState)
    }

    isLastStep(): boolean {
        return this.state.IndexState == (this.props.Steps.length - 1) || this.state.ForceFinish;
    }

    isFirstStep(): boolean {
        return this.state.IndexState == 0;
    }


    handleClickBack() {
        if (!this.isFirstStep()) {
            if (this.ActiveStep.canBack()) {
                this.ActiveStep.Back();
                let BodyElement: any = this.props.Steps[this.state.IndexState - 1];
                let newElement = this.cloneWizardStep(BodyElement)
                this.setState({ ActiveState: newElement, IndexState: this.state.IndexState - 1, ForceFinish: false })
            }
        }
    }

    handleClickNext() {
        if (!this.isLastStep()) {
            if (this.ActiveStep.canNext()) {
                this.ActiveStep.Next();
                let BodyElement: any = this.props.Steps[this.state.IndexState + 1];
                let newElement = this.cloneWizardStep(BodyElement)
                this.setState({ ActiveState: newElement, IndexState: this.state.IndexState + 1, ForceFinish: false })
            }
        }
        else {
            if (this.ActiveStep.canNext()) {
                this.ActiveStep.Next();
                if (this.props.onFinish) {
                    this.props.onFinish();
                }
                this.props.onHide();
            }
        }
    }
}

var buttonLeftStyle = {
    float: 'left'
};