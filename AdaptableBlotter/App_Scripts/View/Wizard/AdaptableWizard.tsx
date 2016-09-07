/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import {ButtonGroup, Button, ListGroupItemProps, Modal} from 'react-bootstrap';
import {AdaptableViewFactory} from '../AdaptableViewFactory';

interface AdaptableWizardProps extends React.ClassAttributes<AdaptableWizard> {
    Steps: JSX.Element[]
    Data: any
    onHide: Function;
    onFinish?: Function;
}

interface AdaptableWizardState extends React.ClassAttributes<AdaptableWizard> {
    ActiveState: any
    IndexState: number
}

export interface AdaptableWizardStep {
    canNext(): boolean
    canBack(): boolean
    Next(): void
    Back(): void
    Enter(): void
    StepName: string
}

export interface AdaptableWizardStepProps<T> {
    Data?: T
}

class DummyActiveStep implements AdaptableWizardStep {
    public canNext(): boolean { return false; }
    public canBack(): boolean { return false; }
    public Next(): void { }
    public Back(): void { }
    public Enter(): void { }
    public StepName = ""
}

export class AdaptableWizard extends React.Component<AdaptableWizardProps, AdaptableWizardState> {
    //we need to init with a dummy one as Ref is a callback once the component is rendered. So once set we force Re render.... 
    //I have no idea so far how to do it differently
    private ActiveStep: AdaptableWizardStep = new DummyActiveStep();
    constructor(props: AdaptableWizardProps) {
        super(props);
        let BodyElement: any = this.props.Steps[0];
        let newElement = React.cloneElement(BodyElement, { ref: (Element: AdaptableWizardStep) => { this.ActiveStep = Element; this.forceUpdate(); }, Data: this.props.Data })
        this.state = { ActiveState: newElement, IndexState: 0 }
        // this.state = { ActiveState: <BodyElement ref={(ref: AdaptableWizardStep) => {this.ActiveStep = ref;this.forceUpdate();}}></BodyElement>}
    }
    render() {
        return (
            <Modal show={true} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Step {this.ActiveStep.StepName} - Name</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {this.state.ActiveState}
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button bsStyle="primary" disabled={!this.ActiveStep.canBack() || this.isFirstStep() } onClick={() => this.handleClickBack() }>Back</Button>
                        <Button bsStyle="primary"   onClick={() => this.handleClickNext() }>{this.isLastStep() ? "Finish" : "Next"}</Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        );
    }

    isLastStep(): boolean {
        return this.state.IndexState == (this.props.Steps.length - 1);
    }

    isFirstStep(): boolean {
        return this.state.IndexState == 0;
    }


    handleClickBack() {
        if (!this.isFirstStep()) {
            this.ActiveStep.Back();
            let BodyElement: any = this.props.Steps[this.state.IndexState - 1];
            let newElement = React.cloneElement(BodyElement, { ref: (Element: AdaptableWizardStep) => { this.ActiveStep = Element; this.forceUpdate(); }, Data: this.props.Data })
            this.setState({ ActiveState: newElement, IndexState: this.state.IndexState - 1 }, () => this.ActiveStep.Enter())
        }
    }

    handleClickNext() {
        if (!this.isLastStep()) {
            this.ActiveStep.Next();
            let BodyElement: any = this.props.Steps[this.state.IndexState + 1];
            let newElement = React.cloneElement(BodyElement, { ref: (Element: AdaptableWizardStep) => { this.ActiveStep = Element; this.forceUpdate(); }, Data: this.props.Data })
            this.setState({ ActiveState: newElement, IndexState: this.state.IndexState + 1 }, () => this.ActiveStep.Enter())
        }
        else {
            this.ActiveStep.Next();
            if (this.props.onFinish) {
                this.props.onFinish();
            }
            this.props.onHide();
        }
    }
}