import * as React from 'react';

import { AdaptableWizardStep } from './Interface/IAdaptableWizard';
import { WizardLegend } from './WizardLegend';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { Flex } from 'rebass';
import Dialog from '../../components/Dialog';
import SimpleButton from '../../components/SimpleButton';
import Panel from '../../components/Panel';
import { AdaptableApi } from '../../types';
import { CSSProperties } from 'react';

export interface IWizardStepInfo {
  StepName: string;
  Element: JSX.Element;
  Index: number;
}

export interface AdaptableWizardProps extends React.ClassAttributes<AdaptableWizard> {
  steps: IWizardStepInfo[];
  data: any;
  onHide: Function;
  onFinish?: Function;
  stepStartIndex?: number;
  friendlyName?: string;
  modalContainer: HTMLElement;
  canFinishWizard: Function;
  style?: CSSProperties;
  showStepsLegend?: Boolean;
  api: AdaptableApi;
}

export interface AdaptableWizardState extends React.ClassAttributes<AdaptableWizard> {
  ActiveState: any;
  IndexState: number;
}

class DummyActiveStep implements AdaptableWizardStep {
  public canNext(): boolean {
    return false;
  }
  public canBack(): boolean {
    return false;
  }

  public next(): void {
    // no implementation for this
  }
  public back(): void {
    // no implementation for this
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
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
  private stepName: string;
  constructor(props: AdaptableWizardProps) {
    super(props);
    let indexStart = 0;
    if (this.props.stepStartIndex) {
      indexStart = this.props.stepStartIndex;
    }

    let BodyElement: JSX.Element = this.props.steps[indexStart].Element;
    this.stepName = this.props.steps[indexStart].StepName;
    let newElement = this.cloneWizardStep(BodyElement);
    this.state = { ActiveState: newElement, IndexState: indexStart };
  }

  render() {
    let wizardStepNames: string[] = ArrayExtensions.RetrieveDistinct(
      this.props.steps.map(x => {
        return x.StepName;
      })
    );

    const hasNext = this.props.steps.length > 1;
    const hasBack = hasNext;

    return (
      <Dialog
        modal
        isOpen={true}
        showCloseButton={false}
        onDismiss={() => (this.props.onHide ? this.props.onHide() : null)}
      >
        <Flex
          flexDirection="column"
          style={{
            height: '100%',
            width: '70vw',
            maxWidth: 1000,
            maxHeight: '80vh',
            ...this.props.style,
          }}
        >
          <Panel
            header={this.props.friendlyName}
            border="none"
            className="ab-WizardDialog__steps"
            borderRadius="none"
            variant="primary"
            style={{ flex: 'none' }}
          >
            {this.props.showStepsLegend === false ? null : (
              <WizardLegend
                StepNames={wizardStepNames}
                ActiveStepName={this.stepName}
                FriendlyName={''}
                CanShowAllSteps={this.canFinishWizard()}
                onStepButtonClicked={s => this.onStepButtonClicked(s)}
              />
            )}
          </Panel>

          <Flex style={{ flex: 1, overflow: 'auto' }} flexDirection="column">
            {this.state.ActiveState}
          </Flex>
          <Flex
            flexDirection="row"
            padding={2}
            backgroundColor="primary"
            alignItems="center"
            className="ab-WizardDialog__footer"
          >
            <SimpleButton
              tone="neutral"
              variant="text"
              data-name="close"
              onClick={() => this.props.onHide()}
              tooltip="Close wizard"
              accessLevel={'Full'}
            >
              CLOSE
            </SimpleButton>
            <div style={{ flex: 1 }} />
            {hasBack ? (
              <SimpleButton
                data-name="back"
                variant="outlined"
                disabled={!this.ActiveStep.canBack() || this.isFirstStep()}
                onClick={() => this.handleClickBack()}
                icon="arrow-left"
                accessLevel={'Full'}
              >
                Back
              </SimpleButton>
            ) : null}
            {hasNext ? (
              <SimpleButton
                variant="outlined"
                data-name="next"
                disabled={!this.ActiveStep.canNext() || this.isLastStep()}
                onClick={() => this.handleClickNext()}
                icon="arrow-right"
                iconPosition="end"
                accessLevel={'Full'}
                marginLeft={2}
                marginRight={2}
              >
                Next
              </SimpleButton>
            ) : null}
            <SimpleButton
              tone="accent"
              data-name="finish"
              variant="raised"
              disabled={!this.canFinishWizard()}
              onClick={() => this.handleClickFinish()}
              icon={'check'}
              accessLevel={'Full'}
            >
              Finish
            </SimpleButton>
          </Flex>
        </Flex>
      </Dialog>
    );
  }

  private onStepButtonClicked(stepName: string): void {
    let wizardStepInfo: IWizardStepInfo = this.props.steps.find(s => s.StepName == stepName);
    let bodyElement: any = wizardStepInfo.Element;
    let newElement = this.cloneWizardStep(bodyElement);
    this.stepName = wizardStepInfo.StepName;
    this.setState({ ActiveState: newElement, IndexState: wizardStepInfo.Index });
  }

  ForceUpdateGoBackState() {
    this.forceUpdate();
  }

  isLastStep(): boolean {
    return this.state.IndexState == this.props.steps.length - 1;
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
        let decrement = this.ActiveStep.getIndexStepDecrement();
        this.ActiveStep.back();
        let activeWizardInfo: IWizardStepInfo = this.props.steps[this.state.IndexState - decrement];
        let bodyElement: JSX.Element = activeWizardInfo.Element;
        let newElement = this.cloneWizardStep(bodyElement);
        this.stepName = activeWizardInfo.StepName;
        this.setState({ ActiveState: newElement, IndexState: this.state.IndexState - decrement });
      }
    }
  }

  handleClickNext() {
    if (this.ActiveStep.canNext()) {
      let increment = this.ActiveStep.getIndexStepIncrement();
      this.ActiveStep.next();
      let activeWizardInfo: IWizardStepInfo = this.props.steps[this.state.IndexState + increment];
      let bodyElement: JSX.Element = activeWizardInfo.Element;
      let newElement = this.cloneWizardStep(bodyElement);
      this.stepName = activeWizardInfo.StepName;
      this.setState({ ActiveState: newElement, IndexState: this.state.IndexState + increment });
    }
  }

  handleClickFinish() {
    if (this.ActiveStep.canNext()) {
      this.ActiveStep.next();
      if (this.props.onFinish) {
        this.props.onFinish();
      }
      this.props.onHide();
    }
  }

  //So we inject everything needed for the Wizard
  private cloneWizardStep(step: JSX.Element): JSX.Element {
    return React.cloneElement(step, {
      ref: (Element: AdaptableWizardStep) => {
        this.ActiveStep = Element;
        this.forceUpdate();
      },
      data: this.props.data,
      updateGoBackState: () => this.ForceUpdateGoBackState(),
      api: this.props.api,
    });
  }
}
