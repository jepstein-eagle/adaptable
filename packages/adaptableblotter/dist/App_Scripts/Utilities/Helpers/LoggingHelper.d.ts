import { MessageType } from "../Enums";
export declare module LoggingHelper {
    function LogAlert(message: string, messageType: MessageType, ...optionalParams: any[]): void;
    function LogInfo(message: string, ...optionalParams: any[]): void;
    function LogSuccess(message: string, ...optionalParams: any[]): void;
    function LogWarning(message: string, ...optionalParams: any[]): void;
    function LogError(message: string, ...optionalParams: any[]): void;
}
