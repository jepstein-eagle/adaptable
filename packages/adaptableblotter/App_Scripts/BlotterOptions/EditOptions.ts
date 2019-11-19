import { DataChangedInfo } from '../Utilities/Interface/DataChangedInfo';

export interface EditOptions {
  validateOnServer?: (dataChangedInfo: DataChangedInfo) => Promise<Validation>;
}

export interface Validation {
  ValidationMessage?: string;
  NewValue?: any;
}
