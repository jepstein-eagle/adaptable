import { IAdaptableAlert } from './IMessage';

export interface IFDC3Schema {
  object: string;
  definition: string;
  version: string;
}

export interface IColumnStateChangedEventArgs {
  currentLayout: string;
}

export interface IAlertFiredEventArgs {
  alert: IAdaptableAlert;
}

export interface IThemeChangedEventArgs {
  themeName: string;
}

export interface IAdaptableBlotterEventData {
  name: string;
  type: string;
}
