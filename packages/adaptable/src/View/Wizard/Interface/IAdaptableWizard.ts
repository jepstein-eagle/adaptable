import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';
import { AdaptableApi } from '../../../Api/AdaptableApi';

export interface AdaptableWizardStep {
  canNext(): boolean;
  canBack(): boolean;
  Next(): void;
  Back(): void;
  GetIndexStepIncrement(): number;
  GetIndexStepDecrement(): number;
}

export interface AdaptableWizardStepProps<T> {
  Data?: T;
  UpdateGoBackState?(): void;
  Api: AdaptableApi;
}

// props for a wizard that wraps a config entity that contans an Expression
export interface AdaptableObjectExpressionAdaptableWizardProps<View>
  extends AdaptableObjectAdaptableWizardProps<View> {
  Api: AdaptableApi;
}

// props for a basic wizard
export interface AdaptableWizardProps<View> extends React.ClassAttributes<View> {
  WizardStartIndex: number;
  onCloseWizard: () => void;
  onFinishWizard: () => void;
  ModalContainer: HTMLElement;
  canFinishWizard: Function;
}

// props for a wizard that wraps a config entity (without an expression)
export interface AdaptableObjectAdaptableWizardProps<View> extends AdaptableWizardProps<View> {
  ConfigEntities: AdaptableObject[];
  EditedAdaptableObject: AdaptableObject;
}
