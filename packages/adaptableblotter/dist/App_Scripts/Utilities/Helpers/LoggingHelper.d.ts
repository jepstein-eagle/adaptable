import { MessageType } from "../Enums";
export declare module LoggingHelper {
    function LogAlert(message: string, messageType: MessageType, ...optionalParams: any[]): void;
    function LogAdaptableBlotterInfo(message: string, ...optionalParams: any[]): void;
    function LogAdaptableBlotterSuccess(message: string, ...optionalParams: any[]): void;
    function LogAdaptableBlotterWarning(message: string, ...optionalParams: any[]): void;
    function LogAdaptableBlotterError(message: string, ...optionalParams: any[]): void;
    function LogError(message: string, ...optionalParams: any[]): void;
}
