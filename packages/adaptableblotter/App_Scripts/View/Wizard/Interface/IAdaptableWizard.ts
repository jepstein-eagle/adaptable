import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptableBlotter } from '../../../BlotterInterfaces/IAdaptableBlotter';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';
import { NamedFilter } from '../../../PredefinedConfig/NamedFilterState';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';

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
  Blotter?: IAdaptableBlotter;
  Columns?: AdaptableColumn[];
}

// props for an Expression Wizard Page
export interface ExpressionWizardProps<T> extends AdaptableWizardStepProps<T> {
  UserFilters: UserFilter[];
  SystemFilters: string[];
  NamedFilters: NamedFilter[];
  ColumnCategories: ColumnCategory[];
}

// props for a wizard that wraps a config entity that contans an Expression
export interface AdaptableObjectExpressionAdaptableWizardProps<View>
  extends AdaptableObjectAdaptableWizardProps<View> {
  Columns: Array<AdaptableColumn>;
  UserFilters: UserFilter[];
  SystemFilters: string[];
  NamedFilters: NamedFilter[];
  ColumnCategories: ColumnCategory[];
  Blotter: IAdaptableBlotter;
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
