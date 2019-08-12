import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { MessageType } from '../../PredefinedConfig/Common/Enums';

export function LogAlert(
  message: string,
  messageType: MessageType,
  ...optionalParams: any[]
): void {
  switch (messageType) {
    case MessageType.Info:
      LogAdaptableBlotterInfo(message, optionalParams);
      break;
    case MessageType.Success:
      LogAdaptableBlotterSuccess(message, optionalParams);
      break;
    case MessageType.Warning:
      LogAdaptableBlotterWarning(message, optionalParams);
      break;
    case MessageType.Error:
      LogAdaptableBlotterError(message, optionalParams);
      break;
  }
}
export function LogAdaptableBlotterInfo(message: string, ...optionalParams: any[]): void {
  if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
    console.info('Adaptable Blotter Info: ' + message, optionalParams);
  } else {
    console.info('Adaptable Blotter Info: ' + message);
  }
}
export function LogAdaptableBlotterSuccess(message: string, ...optionalParams: any[]): void {
  if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
    console.log('Adaptable Blotter Success: ' + message, optionalParams);
  } else {
    console.log('Adaptable Blotter Success: ' + message);
  }
}
export function LogAdaptableBlotterWarning(message: string, ...optionalParams: any[]): void {
  if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
    console.warn('Adaptable Blotter Warning: ' + message, optionalParams);
  } else {
    console.warn('Adaptable Blotter Warning: ' + message);
  }
}
export function LogAdaptableBlotterError(message: string, ...optionalParams: any[]): void {
  if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
    console.error('Adaptable Blotter Error: ' + message, optionalParams);
  } else {
    console.error('Adaptable Blotter Error: ' + message);
  }
}

export function LogWarning(message: string, ...optionalParams: any[]): void {
  if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
    console.warn(message, optionalParams);
  } else {
    console.warn(message);
  }
}

export function LogError(message: string, ...optionalParams: any[]): void {
  if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
    console.error(message, optionalParams);
  } else {
    console.error(message);
  }
}

export function LogInfo(message: string, ...optionalParams: any[]): void {
  if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
    console.info(message, optionalParams);
  } else {
    console.info(message);
  }
}

export function LogObject(objectToLog: any, ...optionalParams: any[]): void {
  if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
    console.log(objectToLog, optionalParams);
  } else {
    console.log(objectToLog);
  }
}

export const LoggingHelper = {
  LogAlert,
  LogAdaptableBlotterInfo,
  LogAdaptableBlotterSuccess,
  LogAdaptableBlotterWarning,
  LogAdaptableBlotterError,
  LogWarning,
  LogError,
  LogInfo,
  LogObject,
};
export default LoggingHelper;
