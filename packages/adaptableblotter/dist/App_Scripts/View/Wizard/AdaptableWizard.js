"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const WizardLegend_1 = require("./WizardLegend");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const ButtonCancel_1 = require("../Components/Buttons/ButtonCancel");
const ButtonWizardAction_1 = require("../Components/Buttons/ButtonWizardAction");
const Enums_1 = require("../../Utilities/Enums");
class DummyActiveStep {
    constructor() {
        this.StepName = "";
    }
    canNext() { return false; }
    canBack() { return false; }
    Next() {
        // no implementation for this 
    }
    Back() {
        // no implementation for this
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
//Remark : the component doesnt handle the change of props once displayed... It's easy to do but not sure it's needed
//as in the top component we do the render with a ternary expression so we add/remove the element from the render instead of having a property
//Show/hide. 
class AdaptableWizard extends React.Component {
    constructor(props) {
        super(props);
        //we need to init with a dummy one as Ref is a callback once the component is rendered. So once set we force Re render.... 
        //I have no idea so far how to do it differently
        this.ActiveStep = new DummyActiveStep();
        let indexStart = 0;
        if (this.props.StepStartIndex) {
            indexStart = this.props.StepStartIndex;
        }
        let BodyElement = this.props.Steps[indexStart];
        let newElement = this.cloneWizardStep(BodyElement);
        this.state = { ActiveState: newElement, IndexState: indexStart };
    }
    render() {
        let cssClassName = StyleConstants.AB_STYLE;
        return (React.createElement(react_bootstrap_1.Modal, { show: true, onHide: this.props.onHide, className: cssClassName + StyleConstants.BASE, container: this.props.ModalContainer },
            React.createElement("div", { className: cssClassName + StyleConstants.WIZARD_BASE },
                React.createElement(react_bootstrap_1.Modal.Header, { closeButton: true, className: cssClassName + StyleConstants.WIZARD_HEADER },
                    React.createElement(react_bootstrap_1.Modal.Title, null,
                        React.createElement(WizardLegend_1.WizardLegend, { StepNames: this.props.StepNames, ActiveStepName: this.ActiveStep.StepName, FriendlyName: this.props.FriendlyName, CanShowAllSteps: this.canFinishWizard(), onStepButtonClicked: (s) => this.onStepButtonClicked(s) }))),
                React.createElement(react_bootstrap_1.Modal.Body, { className: cssClassName + StyleConstants.WIZARD_BODY },
                    React.createElement("div", { className: "ab_main_wizard" }, this.state.ActiveState)),
                React.createElement(react_bootstrap_1.Modal.Footer, { className: cssClassName + StyleConstants.WIZARD_FOOTER },
                    React.createElement(ButtonCancel_1.ButtonCancel, { cssClassName: cssClassName, DisplayMode: "Glyph+Text", bsStyle: "default", style: { float: "left", marginRight: "5px" }, onClick: () => this.props.onHide(), hideToolTip: true, AccessLevel: Enums_1.AccessLevel.Full }),
                    React.createElement(ButtonWizardAction_1.ButtonWizardAction, { cssClassName: cssClassName, DisplayMode: "Glyph+Text", bsStyle: "default", overrideDisableButton: !this.ActiveStep.canBack() || this.isFirstStep(), onClick: () => this.handleClickBack(), glyph: "chevron-left", overrideText: "Back", AccessLevel: Enums_1.AccessLevel.Full }),
                    React.createElement(ButtonWizardAction_1.ButtonWizardAction, { cssClassName: cssClassName, DisplayMode: "Glyph+Text", bsStyle: "info", overrideDisableButton: !this.ActiveStep.canNext() || this.isLastStep(), onClick: () => this.handleClickNext(), overrideText: "Next", glyph: "chevron-right", AccessLevel: Enums_1.AccessLevel.Full }),
                    React.createElement(ButtonWizardAction_1.ButtonWizardAction, { cssClassName: cssClassName, DisplayMode: "Glyph+Text", bsStyle: "primary", overrideDisableButton: !this.canFinishWizard(), onClick: () => this.handleClickFinish(), overrideText: "Finish", glyph: "ok", AccessLevel: Enums_1.AccessLevel.Full })))));
    }
    onStepButtonClicked(stepName) {
        let stepIndex = this.props.StepNames.findIndex(s => s == stepName);
        let BodyElement = this.props.Steps[stepIndex];
        let newElement = this.cloneWizardStep(BodyElement);
        this.setState({ ActiveState: newElement, IndexState: stepIndex });
    }
    ForceUpdateGoBackState() {
        //to force back/next. We'll see if that needs to be optimised'
        /*
           <Modal.Title>Step {this.state.IndexState + 1 + " of " + this.props.Steps.length} - {this.ActiveStep.StepName}</Modal.Title>
                
           */
        this.forceUpdate();
        //  this.setState({ ForceFinish: forceFinish } as AdaptableWizardState)
    }
    isLastStep() {
        return this.state.IndexState == (this.props.Steps.length - 1);
    }
    isFirstStep() {
        return this.state.IndexState == 0;
    }
    canFinishWizard() {
        return this.ActiveStep.canNext() && this.props.canFinishWizard();
    }
    handleClickBack() {
        if (!this.isFirstStep()) {
            if (this.ActiveStep.canBack()) {
                let decrement = this.ActiveStep.GetIndexStepDecrement();
                this.ActiveStep.Back();
                let BodyElement = this.props.Steps[this.state.IndexState - decrement];
                let newElement = this.cloneWizardStep(BodyElement);
                this.setState({ ActiveState: newElement, IndexState: this.state.IndexState - decrement });
            }
        }
    }
    handleClickNext() {
        if (this.ActiveStep.canNext()) {
            let increment = this.ActiveStep.GetIndexStepIncrement();
            this.ActiveStep.Next();
            let BodyElement = this.props.Steps[this.state.IndexState + increment];
            let newElement = this.cloneWizardStep(BodyElement);
            this.setState({ ActiveState: newElement, IndexState: this.state.IndexState + increment });
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
    cloneWizardStep(step) {
        return React.cloneElement(step, {
            ref: (Element) => { this.ActiveStep = Element; this.forceUpdate(); },
            Data: this.props.Data,
            UpdateGoBackState: () => this.ForceUpdateGoBackState()
        });
    }
}
exports.AdaptableWizard = AdaptableWizard;
