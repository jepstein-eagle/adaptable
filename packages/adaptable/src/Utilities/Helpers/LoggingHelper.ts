import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { MessageType } from '../../PredefinedConfig/Common/Enums';

export function LogAlert(
  message: string,
  messageType: MessageType,
  ...optionalParams: any[]
): void {
  switch (messageType) {
    case MessageType.Info:
      LogAdaptableInfo(message, optionalParams);
      break;
    case MessageType.Success:
      LogAdaptableSuccess(message, optionalParams);
      break;
    case MessageType.Warning:
      LogAdaptableWarning(message, optionalParams);
      break;
    case MessageType.Error:
      LogAdaptableError(message, optionalParams);
      break;
  }
}
export function LogAdaptableInfo(message: string, ...optionalParams: any[]): void {
  if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
    console.info('AdapTable Info: ' + message, optionalParams);
  } else {
    console.info('AdapTable Info: ' + message);
  }
}
export function LogAdaptableSuccess(message: string, ...optionalParams: any[]): void {
  if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
    console.log('AdapTable Success: ' + message, optionalParams);
  } else {
    console.log('AdapTable Success: ' + message);
  }
}
export function LogAdaptableWarning(message: string, ...optionalParams: any[]): void {
  if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
    console.warn('AdapTable Warning: ' + message, optionalParams);
  } else {
    console.warn('AdapTable Warning: ' + message);
  }
}
export function LogAdaptableError(message: string, ...optionalParams: any[]): void {
  if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
    console.error('AdapTable Error: ' + message, optionalParams);
  } else {
    console.error('AdapTable Error: ' + message);
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
  LogAdaptableInfo,
  LogAdaptableSuccess,
  LogAdaptableWarning,
  LogAdaptableError,
  LogWarning,
  LogError,
  LogInfo,
  LogObject,
};
export default LoggingHelper;
