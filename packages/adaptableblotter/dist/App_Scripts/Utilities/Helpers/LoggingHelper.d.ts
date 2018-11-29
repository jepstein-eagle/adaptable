import { MessageType } from "../../Utilities/Enums";
export declare module LoggingHelper {
    function LogAlert(message: string, messageType: MessageType, ...optionalParams: any[]): void;
    function LogMessage(message: string, ...optionalParams: any[]): void;
    function LogWarning(message: string, ...optionalParams: any[]): void;
    function LogError(message: string, ...optionalParams: any[]): void;
}
