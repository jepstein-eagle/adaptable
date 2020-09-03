import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';
import { AdaptableApi } from '../../../Api/AdaptableApi';

export interface AdaptableWizardStep {
  canNext(): boolean;
  canBack(): boolean;
  next(): void;
  back(): void;
  getIndexStepIncrement(): number;
  getIndexStepDecrement(): number;
}

export interface AdaptableWizardStepProps<T> {
  data?: T;
  updateGoBackState?(): void;
  api: AdaptableApi;
}

// props for a wizard that wraps a config entity that contans an Expression
export interface AdaptableObjectExpressionAdaptableWizardProps<View>
  extends AdaptableObjectAdaptableWizardProps<View> {
  onSetNewSharedQueryName: (newSharedQueryName: string) => void;
  onSetUseSharedQuery: (useSharedQuery: boolean) => void;
}

// props for a basic wizard
export interface AdaptableWizardProps<View> extends React.ClassAttributes<View> {
  wizardStartIndex: number;
  onCloseWizard: () => void;
  onFinishWizard: () => void;
  modalContainer: HTMLElement;
  canFinishWizard: Function;
}

// props for a wizard that wraps a config entity (without an expression)
export interface AdaptableObjectAdaptableWizardProps<View> extends AdaptableWizardProps<View> {
  configEntities: AdaptableObject[];
  editedAdaptableObject: AdaptableObject;
  api: AdaptableApi;
}
