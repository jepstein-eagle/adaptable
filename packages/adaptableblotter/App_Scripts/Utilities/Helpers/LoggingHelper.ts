import { ArrayExtensions } from "../Extensions/ArrayExtensions";
import { MessageType } from "../Enums";


export module LoggingHelper {

     export function LogAlert(message: string, messageType: MessageType, ...optionalParams: any[]): void {
        switch (messageType) {
            case MessageType.Info:
            LogInfo(message, optionalParams);
                break;
            case MessageType.Success:
            LogSuccess(message, optionalParams);
                break;
            case MessageType.Warning:
                LogWarning(message, optionalParams);
                break;
            case MessageType.Error:
                LogError(message, optionalParams);
                break;
        }
    }
    export function LogInfo(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.log("Adaptable Blotter Info: " + message, optionalParams)
        } else {
            console.log("Adaptable Blotter Info: " + message)
        }
    }
    export function LogSuccess(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.log("Adaptable Blotter Success: " + message, optionalParams)
        } else {
            console.log("Adaptable Blotter Success: " + message)
        }
    }
    export function LogWarning(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.warn("Adaptable Blotter Warning: " + message, optionalParams)
        } else {
            console.warn("Adaptable Blotter Warning: " + message)
        }
    }
    export function LogError(message: string, ...optionalParams: any[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.error("Adaptable Blotter Error: " + message, optionalParams)
        } else {
            console.error("Adaptable Blotter Error: " + message)
        }
    }


}
