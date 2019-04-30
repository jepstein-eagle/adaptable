import { ApiBase } from "./ApiBase";
import { ISystemStatusApi } from './Interface/ISystemStatusApi';
export declare class SystemStatusApi extends ApiBase implements ISystemStatusApi {
    setSystemStatus(statusMessage: string, statusColour: "Blue" | "Red" | "Amber" | "Green"): void;
    setRedSystemStatus(statusMessage: string): void;
    setAmberSystemStatus(statusMessage: string): void;
    setGreenSystemStatus(statusMessage: string): void;
    setBlueSystemStatus(statusMessage: string): void;
    clearSystemStatus(): void;
}
