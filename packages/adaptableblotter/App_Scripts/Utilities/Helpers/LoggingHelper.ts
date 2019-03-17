import { ArrayExtensions } from "../Extensions/ArrayExtensions";
import { MessageType } from "../Enums";


export module LoggingHelper {

    export function LogAlert(message: string, messageType: MessageType, ...optionalParams: any[]): void {
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
            console.log("Adaptable Blotter Info: " + message, optionalParams)
        } else {
            console.log("Adaptable Blotter Info: " + message)
        }
    }
    export function LogAdaptableBlotterSuccess(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.log("Adaptable Blotter Success: " + message, optionalParams)
        } else {
            console.log("Adaptable Blotter Success: " + message)
        }
    }
    export function LogAdaptableBlotterWarning(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.warn("Adaptable Blovtter Warning: " + message, optionalParams)
        } else {
            console.warn("Adaptable Blotter Warning: " + message)
        }
    }
    export function LogAdaptableBlotterError(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.error("Adaptable Blotter Error: " + message, optionalParams)
        } else {
            console.error("Adaptable Blotter Error: " + message)
        }
    }
    
    export function LogWarning(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.warn(message, optionalParams)
        } else {
            console.warn(message)
        }
    }

    export function LogError(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.error(message, optionalParams)
        } else {
            console.error(message)
        }
    }


}
