import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { AdaptableWizardStep } from './Interface/IAdaptableWizard';
import { WizardLegend } from './WizardLegend';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ButtonCancel } from '../Components/Buttons/ButtonCancel';
import { ButtonWizardAction } from '../Components/Buttons/ButtonWizardAction';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { IAdaptableBlotter } from '../../Utilities/Interface/IAdaptableBlotter';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';

export interface IWizardStepInfo {
  StepName: string;
  Element: JSX.Element;
  Index: number;
}

export interface AdaptableWizardProps extends React.ClassAttributes<AdaptableWizard> {
  Steps: IWizardStepInfo[];
  Data: any;
  onHide: Function;
  onFinish?: Function;
  StepStartIndex?: number;
  FriendlyName?: string;
  ModalContainer: HTMLElement;
  cssClassName: string;
  canFinishWizard: Function;
  Blotter: IAdaptableBlotter;
  Columns: Array<IColumn>;
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
  private stepName: string;
  constructor(props: AdaptableWizardProps) {
    super(props);
    let indexStart = 0;
    if (this.props.StepStartIndex) {
      indexStart = this.props.StepStartIndex;
    }

    let BodyElement: JSX.Element = this.props.Steps[indexStart].Element;
    this.stepName = this.props.Steps[indexStart].StepName;
    let newElement = this.cloneWizardStep(BodyElement);
    this.state = { ActiveState: newElement, IndexState: indexStart };
  }

  render() {
    let cssClassName: string = StyleConstants.AB_STYLE;
    let wizardStepNames: string[] = ArrayExtensions.RetrieveDistinct(
      this.props.Steps.map(x => {
        return x.StepName;
      })
    );
    return (
      <Modal
        show={true}
        onHide={this.props.onHide}
        className={cssClassName + StyleConstants.BASE}
        container={this.props.ModalContainer}
      >
        <div className={cssClassName + StyleConstants.WIZARD_BASE}>
          <Modal.Header closeButton className={cssClassName + StyleConstants.WIZARD_HEADER}>
            <Modal.Title>
              <WizardLegend
                StepNames={wizardStepNames}
                ActiveStepName={this.stepName}
                FriendlyName={this.props.FriendlyName}
                CanShowAllSteps={this.canFinishWizard()}
                onStepButtonClicked={s => this.onStepButtonClicked(s)}
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={cssClassName + StyleConstants.WIZARD_BODY}>
            <div className="ab_main_wizard">{this.state.ActiveState}</div>
          </Modal.Body>
          <Modal.Footer className={cssClassName + StyleConstants.WIZARD_FOOTER}>
            <ButtonCancel
              cssClassName={cssClassName}
              DisplayMode={'Glyph+Text'}
              bsStyle={'default'}
              style={{ float: 'left', marginRight: '5px' }}
              onClick={() => this.props.onHide()}
              hideToolTip={true}
              AccessLevel={AccessLevel.Full}
            />
            <ButtonWizardAction
              cssClassName={cssClassName}
              DisplayMode={'Glyph+Text'}
              bsStyle="default"
              overrideDisableButton={!this.ActiveStep.canBack() || this.isFirstStep()}
              onClick={() => this.handleClickBack()}
              glyph="chevron-left"
              overrideText="Back"
              AccessLevel={AccessLevel.Full}
            />
            <ButtonWizardAction
              cssClassName={cssClassName}
              DisplayMode={'Glyph+Text'}
              bsStyle="info"
              overrideDisableButton={!this.ActiveStep.canNext() || this.isLastStep()}
              onClick={() => this.handleClickNext()}
              overrideText="Next"
              glyph={'chevron-right'}
              AccessLevel={AccessLevel.Full}
            />
            <ButtonWizardAction
              cssClassName={cssClassName}
              DisplayMode={'Glyph+Text'}
              bsStyle="primary"
              overrideDisableButton={!this.canFinishWizard()}
              onClick={() => this.handleClickFinish()}
              overrideText="Finish"
              glyph={'ok'}
              AccessLevel={AccessLevel.Full}
            />
          </Modal.Footer>
        </div>
      </Modal>
    );
  }

  private onStepButtonClicked(stepName: string): void {
    let wizardStepInfo: IWizardStepInfo = this.props.Steps.find(s => s.StepName == stepName);
    let bodyElement: any = wizardStepInfo.Element;
    let newElement = this.cloneWizardStep(bodyElement);
    this.stepName = wizardStepInfo.StepName;
    this.setState({ ActiveState: newElement, IndexState: wizardStepInfo.Index });
  }

  ForceUpdateGoBackState() {
    this.forceUpdate();
  }

  isLastStep(): boolean {
    return this.state.IndexState == this.props.Steps.length - 1;
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
        let decrement = this.ActiveStep.GetIndexStepDecrement();
        this.ActiveStep.Back();
        let activeWizardInfo: IWizardStepInfo = this.props.Steps[this.state.IndexState - decrement];
        let bodyElement: JSX.Element = activeWizardInfo.Element;
        let newElement = this.cloneWizardStep(bodyElement);
        this.stepName = activeWizardInfo.StepName;
        this.setState({ ActiveState: newElement, IndexState: this.state.IndexState - decrement });
      }
    }
  }

  handleClickNext() {
    if (this.ActiveStep.canNext()) {
      let increment = this.ActiveStep.GetIndexStepIncrement();
      this.ActiveStep.Next();
      let activeWizardInfo: IWizardStepInfo = this.props.Steps[this.state.IndexState + increment];
      let bodyElement: JSX.Element = activeWizardInfo.Element;
      let newElement = this.cloneWizardStep(bodyElement);
      this.stepName = activeWizardInfo.StepName;
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
  private cloneWizardStep(step: JSX.Element): JSX.Element {
    return React.cloneElement(step, {
      ref: (Element: AdaptableWizardStep) => {
        this.ActiveStep = Element;
        this.forceUpdate();
      },
      Data: this.props.Data,
      UpdateGoBackState: () => this.ForceUpdateGoBackState(),
      Blotter: this.props.Blotter,
      cssClassName: this.props.cssClassName,
      Columns: this.props.Columns,
    });
  }
}
